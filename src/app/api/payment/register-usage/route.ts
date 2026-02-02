import { createClient as createServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Initialize Supabase Admin Client (Service Role) to bypass RLS for inserts
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ error: 'Código inválido' }, { status: 400 });
        }

        const cleanCode = code.trim().toUpperCase();
        // Use regular client for coupon validation (RLS safe)
        const supabase = await createServerClient();

        // 1. Get Coupon ID and check limits again
        const { data: coupon, error: fetchError } = await supabase
            .from('coupons')
            .select('id, current_uses, max_uses')
            .eq('code', cleanCode)
            .single();

        if (fetchError || !coupon) {
            return NextResponse.json({ error: 'Cupom não encontrado' }, { status: 404 });
        }

        if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) {
            return NextResponse.json({ error: 'Limite de uso excedido' }, { status: 400 });
        }

        // 2. Increment usage (Using admin to ensure we can update regardless of user RLS, though coupon logic might be public)
        const { error: updateError } = await supabaseAdmin
            .from('coupons')
            .update({ current_uses: coupon.current_uses + 1 })
            .eq('id', coupon.id);

        if (updateError) {
            throw updateError;
        }

        // 3. Register usage log
        await supabaseAdmin
            .from('coupon_usages')
            .insert({
                coupon_id: coupon.id,
                metadata: {
                    userAgent: request.headers.get('user-agent'),
                    timestamp: new Date().toISOString()
                }
            });

        // 4. Generate a "Free Payment ID" (Usage ID)
        // This allows the user to download the file using the secure flow
        const usageId = crypto.randomUUID();

        // 5. Insert into payment_downloads to authorize the download
        const { error: insertError } = await supabaseAdmin
            .from('payment_downloads')
            .insert({
                payment_id: usageId,
                download_count: 0,
                max_downloads: 1, // Start with 1 download allowed
                created_at: new Date().toISOString()
            });

        if (insertError) {
            console.error('Error inserting free download record:', insertError);
            return NextResponse.json({ error: 'Erro ao gerar autorização de download.' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            paymentId: usageId
        });

    } catch (error) {
        console.error('Coupon usage registration error:', error);
        return NextResponse.json({ error: 'Erro ao registrar uso do cupom.' }, { status: 500 });
    }
}
