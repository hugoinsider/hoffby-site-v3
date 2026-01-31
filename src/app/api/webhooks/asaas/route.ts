
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { loadEnvConfig } from '@next/env';

// Force load env vars from project root
loadEnvConfig(process.cwd());

const ASAAS_ACCESS_TOKEN = process.env.ASAAS_API_KEY; // Using the main key to verify if needed, or simply trusting the secret setup in Asaas

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { event, payment } = body;

        console.log('Webhook Received:', event, payment?.id);

        // Basic verification: Check if it's a payment event we care about
        if (event !== 'PAYMENT_CONFIRMED' && event !== 'PAYMENT_RECEIVED') {
            // We acknowledge other events but don't act
            return NextResponse.json({ received: true });
        }

        if (!payment) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Setup Supabase Admin Client
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error('Missing Supabase credentials for Webhook');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // Find the lead associated with this payment
        // We can match by asaas_customer_id or asaas_subscription_id if available
        // Payment object usually has: customer, subscription (optional)

        let query = supabase.from('boost_leads').select('id');

        if (payment.subscription) {
            query = query.eq('asaas_subscription_id', payment.subscription);
        } else if (payment.customer) {
            query = query.eq('asaas_customer_id', payment.customer);
        } else {
            // Fallback: try to match by email if available in payment? Not reliable.
            console.error('Webhook: No subscription or customer ID in payment payload', payment.id);
            return NextResponse.json({ received: true, warning: 'No identifier found' });
        }

        const { data: leads, error: searchError } = await query;

        if (searchError || !leads || leads.length === 0) {
            console.error('Webhook: Lead not found for payment', payment.id);
            return NextResponse.json({ received: true, warning: 'Lead not found' });
        }

        const leadId = leads[0].id;

        // Update status to active
        const { error: updateError } = await supabase
            .from('boost_leads')
            .update({
                status: 'active',
                updated_at: new Date().toISOString()
            })
            .eq('id', leadId);

        if (updateError) {
            console.error('Webhook: Failed to update lead status', updateError);
            return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
        }

        console.log(`Webhook: Lead ${leadId} activated successfully via payment ${payment.id}`);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
