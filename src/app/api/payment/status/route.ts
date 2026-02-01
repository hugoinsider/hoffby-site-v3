import { NextResponse } from 'next/server';
import { getPaymentStatus, createInvoice, checkInvoiceExists } from '../../services/asaas';

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

        // If payment confirmed, try to create invoice
        if (result.confirmed) {
            // Check if invoice already exists to avoid duplicates
            const hasInvoice = await checkInvoiceExists(paymentId);

            if (!hasInvoice) {
                await createInvoice({
                    paymentId: result.id,
                    customerId: result.customerId,
                    value: result.value,
                    description: 'Download Currículo - Hoffby'
                });
            }
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Payment Status API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Erro ao verificar status' },
            { status: 500 }
        );
    }
}
