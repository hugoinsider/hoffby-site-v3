import { createClient } from '@supabase/supabase-js';

export const createAdminClient = () => {
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    // Fallback or warning if key is missing, but usually this throws to alert the dev
    if (!supabaseUrl || !supabaseServiceKey) {
        console.warn("Missing SUPABASE_SERVICE_ROLE_KEY. Admin operations might fail nicely or fallback to anon if not careful (but here we just throw or return null).");
        // We throw because if we are calling this, we EXPECT to be super admin.
        if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.');
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};
