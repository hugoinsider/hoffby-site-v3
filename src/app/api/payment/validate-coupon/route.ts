
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

        // Query coupon
        const { data: coupon, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', cleanCode)
            .eq('active', true)
            .single();

        if (error || !coupon) {
            return NextResponse.json({ valid: false, message: 'Cupom inválido ou não encontrado.' }, { status: 404 });
        }

        // Check limits
        if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) {
            return NextResponse.json({ valid: false, message: 'Este cupom já atingiu o limite de usos.' }, { status: 400 });
        }

        // Coupon is valid
        return NextResponse.json({
            valid: true,
            discountPercent: coupon.discount_percent,
            message: 'Cupom aplicado com sucesso!'
        });

    } catch (error) {
        console.error('Coupon validation error:', error);
        return NextResponse.json({ error: 'Erro interno ao validar cupom.' }, { status: 500 });
    }
}
