
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ error: 'Código inválido' }, { status: 400 });
        }

        const cleanCode = code.trim().toUpperCase();
        const supabase = await createClient();

        // 1. Get Coupon ID and check limits again (Race condition possible but acceptable for MVP)
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

        // 2. Increment usage
        const { error: updateError } = await supabase
            .from('coupons')
            .update({ current_uses: coupon.current_uses + 1 })
            .eq('id', coupon.id);

        if (updateError) {
            throw updateError;
        }

        // 3. Register usage log
        const { error: logError } = await supabase
            .from('coupon_usages')
            .insert({
                coupon_id: coupon.id,
                metadata: {
                    userAgent: request.headers.get('user-agent'),
                    timestamp: new Date().toISOString()
                }
            });

        if (logError) {
            console.error('Error logging usage:', logError);
            // Don't fail the request just because logging failed, but good to know
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Coupon usage registration error:', error);
        return NextResponse.json({ error: 'Erro ao registrar uso do cupom.' }, { status: 500 });
    }
}
