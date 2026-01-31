
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { personal, resumeData } = body;

        if (!personal || !personal.email) {
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

        const { data, error } = await supabase
            .from('boost_leads')
            .upsert({
                email: personal.email,
                full_name: personal.fullName,
                phone: personal.phone,
                resume_data: resumeData,
                status: 'captured', // Initial status before payment
                updated_at: new Date().toISOString()
            }, { onConflict: 'email' })
            .select()
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: 'Failed to save lead', details: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, leadId: data.id });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
