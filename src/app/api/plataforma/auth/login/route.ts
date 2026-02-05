import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Initialize Supabase Client (handles cookies automatically)
        const supabase = await createClient();

        // Authenticate
        const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 401 });
        }

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check Role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        // Default to student if no profile found (or if error)
        const role = profile?.role || 'student';

        return NextResponse.json({ success: true, role });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
