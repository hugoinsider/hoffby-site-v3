import { NextResponse } from 'next/server';
import { getPaymentStatus } from '../../services/asaas';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const paymentId = searchParams.get('id');

        if (!paymentId) {
            return NextResponse.json(
                { error: 'ID do pagamento não fornecido' },
                { status: 400 }
            );
        }

        const result = await getPaymentStatus(paymentId);

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Payment Status API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Erro ao verificar status' },
            { status: 500 }
        );
    }
}
