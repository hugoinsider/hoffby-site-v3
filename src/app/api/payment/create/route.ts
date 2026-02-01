import { NextResponse } from 'next/server';
import { createCustomer, createPixCharge } from '../../services/asaas';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, cpf, type } = body;

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

        // 1. Get or Create Customer
        const customerId = await createCustomer({
            name,
            email,
            cpfCnpj: cpfClean
        });

        // 2. Create Charge
        // Value is R$ 5.00
        const result = await createPixCharge(customerId, 5.00);

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Payment Create API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Erro interno ao criar cobrança' },
            { status: 500 }
        );
    }
}
