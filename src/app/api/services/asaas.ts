export const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com';
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
    console.log("Debug Key Prefix:", ASAAS_API_KEY?.substring(0, 10));
    console.log("URL:", ASAAS_API_URL);
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
    console.log("Debug Key Prefix:", ASAAS_API_KEY?.substring(0, 10));
    console.log("URL:", ASAAS_API_URL);
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
    console.log("Debug Key Prefix:", ASAAS_API_KEY?.substring(0, 10));
    console.log("URL:", ASAAS_API_URL);
    try {
        const response = await fetch(`${ASAAS_API_URL}/api/v3/payments/${paymentId}`, { headers });
        const payment = await response.json();

        return {
            id: payment.id,
            customerId: payment.customer,
            value: payment.value,
            status: payment.status, // RECEIVED, CONFIRMED, OVERDUE, PENDING
            confirmed: payment.status === 'RECEIVED' || payment.status === 'CONFIRMED'
        };
    } catch (error) {
        console.error('Error in getPaymentStatus:', error);
        throw error;
    }
}

interface CreateInvoiceDTO {
    paymentId: string;
    customerId: string;
    value: number;
    description?: string;
}

export async function createInvoice(data: CreateInvoiceDTO) {
    console.log("Debug Key Prefix:", ASAAS_API_KEY?.substring(0, 10));
    console.log("URL:", ASAAS_API_URL);
    try {
        // 1. Get Municipal Service
        // We assume the user has configured at least one service in their Asaas account.
        const servicesResponse = await fetch(`${ASAAS_API_URL}/api/v3/invoices/municipalServices`, { headers });
        const services = await servicesResponse.json();

        if (!services.data || services.data.length === 0) {
            console.warn('No municipal services found. Cannot emit invoice.');
            return null; // Silent fail or throw? Better silent for now to not block flow, but log error.
        }

        // Use the first available service
        const service = services.data[0];

        // 2. Create Invoice
        const invoiceResponse = await fetch(`${ASAAS_API_URL}/api/v3/invoices`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                payment: data.paymentId,
                customer: data.customerId,
                value: data.value,
                serviceDescription: data.description || 'Serviços de Tecnologia',
                municipalServiceId: service.id,
                effectiveDate: new Date().toISOString().split('T')[0], // Today
                observations: 'Emitido automaticamente por Hoffby'
            })
        });

        const invoice = await invoiceResponse.json();

        if (invoice.errors) {
            console.error('Asaas Create Invoice Error:', invoice.errors);
            // Don't throw to avoid breaking the payment confirmation flow visuals
            return null;
        }

        return invoice;

    } catch (error) {
        console.error('Error in createInvoice:', error);
        return null;
    }
}

export async function checkInvoiceExists(paymentId: string) {
    console.log("Debug Key Prefix:", ASAAS_API_KEY?.substring(0, 10));
    console.log("URL:", ASAAS_API_URL);
    try {
        const query = new URLSearchParams({ payment: paymentId });
        const response = await fetch(`${ASAAS_API_URL}/api/v3/invoices?${query}`, { headers });
        const result = await response.json();

        return result.data && result.data.length > 0;
    } catch (error) {
        console.error('Error checking invoice:', error);
        return false;
    }
}
