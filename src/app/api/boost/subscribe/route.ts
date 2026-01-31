
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

export async function POST(request: Request) {
    try {
        if (!ASAAS_API_KEY) {
            console.error('ASAAS_API_KEY not defined');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const body = await request.json();
        const { personal, resumeData } = body;

        if (!personal || !personal.email || !personal.fullName) {
            return NextResponse.json({ error: 'Missing personal information' }, { status: 400 });
        }

        // Use Service Role Key to bypass RLS
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error('Missing Supabase credentials');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // 1. Save Lead/Resume to Supabase
        const { data: leadData, error: dbError } = await supabase
            .from('boost_leads')
            .upsert({
                email: personal.email,
                full_name: personal.fullName,
                phone: personal.phone,
                resume_data: resumeData,
                status: 'pending_payment',
                updated_at: new Date().toISOString()
            }, { onConflict: 'email' })
            .select()
            .single();

        if (dbError) {
            console.error('Supabase Error:', dbError);
            // Optionally continue logic or throw
        }

        // 2. Create/Get Customer in Asaas
        let customerId = '';

        const customerSearch = await fetch(`${ASAAS_API_URL}/customers?email=${personal.email}`, {
            headers: { 'access_token': ASAAS_API_KEY }
        });

        const searchResult = await customerSearch.json();

        if (searchResult.data && searchResult.data.length > 0) {
            customerId = searchResult.data[0].id;
        } else {
            // Create Customer
            const createCustomer = await fetch(`${ASAAS_API_URL}/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': ASAAS_API_KEY
                },
                body: JSON.stringify({
                    name: personal.fullName,
                    email: personal.email,
                    mobilePhone: personal.phone,
                    notificationDisabled: false,
                })
            });
            const customerData = await createCustomer.json();
            if (customerData.errors) {
                console.error('Asaas Create Customer Error:', customerData.errors);
                throw new Error('Failed to create customer in Payment Gateway');
            }
            customerId = customerData.id;
        }

        // 3. Create Subscription (Annual Plan)
        const createSubscription = await fetch(`${ASAAS_API_URL}/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY
            },
            body: JSON.stringify({
                customer: customerId,
                billingType: 'PIX', // Default to PIX or CREDIT_CARD
                value: 59.90,
                nextDueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
                cycle: 'YEARLY',
                description: 'Assinatura Anual - Hoffby Boost AI',
                endDate: null
            })
        });

        const subscriptionData = await createSubscription.json();

        if (subscriptionData.errors) {
            console.error('Asaas Subscription Error:', subscriptionData.errors);
            throw new Error('Failed to create subscription');
        }

        // 4. Update Lead with Subscription ID 
        if (leadData && leadData.id) {
            await supabase.from('boost_leads').update({
                asaas_customer_id: customerId,
                asaas_subscription_id: subscriptionData.id
            }).eq('id', leadData.id);
        }

        // 5. Return Payment URL
        const paymentsReq = await fetch(`${ASAAS_API_URL}/subscriptions/${subscriptionData.id}/payments`, {
            headers: { 'access_token': ASAAS_API_KEY }
        });
        const paymentsData = await paymentsReq.json();
        const firstPaymentUrl = paymentsData.data?.[0]?.invoiceUrl || paymentsData.data?.[0]?.bankSlipUrl;

        if (!firstPaymentUrl) {
            return NextResponse.json({ success: true, message: 'Subscription created', subscriptionId: subscriptionData.id });
        }

        return NextResponse.json({ success: true, paymentUrl: firstPaymentUrl });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
