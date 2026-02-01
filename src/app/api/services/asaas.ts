export const ASAAS_API_URL = process.env.NEXT_PUBLIC_ASAAS_API_URL || 'https://www.asaas.com';
export const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

if (!ASAAS_API_KEY) {
    console.warn('⚠️ ASAAS_API_KEY is not set. Payment features will not work.');
}

const headers = {
    'Content-Type': 'application/json',
    'access_token': ASAAS_API_KEY || ''
};

interface CreateCustomerDTO {
    name: string;
    email: string;
    cpfCnpj: string;
}

export async function createCustomer(data: CreateCustomerDTO) {
    try {
        // First try to find existing customer
        const query = new URLSearchParams({ cpfCnpj: data.cpfCnpj });
        const searchResponse = await fetch(`${ASAAS_API_URL}/api/v3/customers?${query}`, { headers });
        const searchResult = await searchResponse.json();

        if (searchResult.data && searchResult.data.length > 0) {
            return searchResult.data[0].id;
        }

        // If not found, create new
        const response = await fetch(`${ASAAS_API_URL}/api/v3/customers`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                cpfCnpj: data.cpfCnpj
            })
        });

        const customer = await response.json();

        if (customer.errors) {
            console.error('Asaas Create Customer Error:', customer.errors);
            throw new Error(customer.errors[0].description);
        }

        return customer.id;
    } catch (error) {
        console.error('Error in createCustomer:', error);
        throw error;
    }
}

export async function createPixCharge(customerId: string, value: number) {
    try {
        // 1. Create the payment
        const paymentResponse = await fetch(`${ASAAS_API_URL}/api/v3/payments`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                customer: customerId,
                billingType: 'PIX',
                value: value,
                dueDate: new Date().toISOString().split('T')[0], // Due today
                description: 'Download Currículo - Hoffby'
            })
        });

        const payment = await paymentResponse.json();

        if (payment.errors) {
            console.error('Asaas Create Payment Error:', payment.errors);
            throw new Error(payment.errors[0].description);
        }

        // 2. Get Pix QR Code
        const qrResponse = await fetch(`${ASAAS_API_URL}/api/v3/payments/${payment.id}/pixQrCode`, { headers });
        const qrCode = await qrResponse.json();

        return {
            paymentId: payment.id,
            encodedImage: qrCode.encodedImage,
            payload: qrCode.payload,
            expirationDate: qrCode.expirationDate
        };
    } catch (error) {
        console.error('Error in createPixCharge:', error);
        throw error;
    }
}

export async function getPaymentStatus(paymentId: string) {
    try {
        const response = await fetch(`${ASAAS_API_URL}/api/v3/payments/${paymentId}`, { headers });
        const payment = await response.json();

        return {
            status: payment.status, // RECEIVED, CONFIRMED, OVERDUE, PENDING
            confirmed: payment.status === 'RECEIVED' || payment.status === 'CONFIRMED'
        };
    } catch (error) {
        console.error('Error in getPaymentStatus:', error);
        throw error;
    }
}
