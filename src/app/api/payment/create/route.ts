
import { NextResponse } from 'next/server';
import { createCustomer, createPixCharge } from '../../services/asaas';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, cpf, type, coupon } = body;

        // Basic validation
        if (!name || !email || !cpf) {
            return NextResponse.json(
                { error: 'Dados incompletos (Nome, Email ou CPF)' },
                { status: 400 }
            );
        }

        // Clean CPF
        const cpfClean = cpf.replace(/\D/g, '');

        if (cpfClean.length !== 11) {
            return NextResponse.json(
                { error: 'CPF inválido' },
                { status: 400 }
            );
        }

        let finalValue = 10.00;

        // Validate Coupon if present
        if (coupon) {
            const supabase = await createClient();
            const { data: couponData, error: couponError } = await supabase
                .from('coupons')
                .select('*')
                .eq('code', coupon.toUpperCase().trim())
                .eq('active', true)
                .single();

            if (!couponError && couponData) {
                // Check limits
                if (couponData.max_uses === null || couponData.current_uses < couponData.max_uses) {
                    const discount = couponData.discount_percent || 0;
                    finalValue = 10.00 * (1 - discount / 100);

                    // Ensure we don't charge 0 via this route (handled by register-usage)
                    if (finalValue < 0.01) finalValue = 0.00;
                }
            }
        }

        // Asaas Validation
        if (finalValue > 0 && finalValue < 5.00) {
            return NextResponse.json(
                { error: 'Devido a regras bancárias, o valor mínimo da cobrança deve ser R$ 5,00.' },
                { status: 400 }
            );
        }

        // 1. Get or Create Customer
        const customerId = await createCustomer({
            name,
            email,
            cpfCnpj: cpfClean
        });

        // 2. Create Charge
        const result = await createPixCharge(customerId, finalValue);

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Payment Create API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Erro interno ao criar cobrança' },
            { status: 500 }
        );
    }
}

