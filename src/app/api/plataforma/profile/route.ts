
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { name, password } = json;

        // 1. Update Profile Data (Name)
        if (name) {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ name })
                .eq('id', user.id);

            if (profileError) throw profileError;
        }

        // 2. Update Password (if provided)
        if (password) {
            const { error: authError } = await supabase.auth.updateUser({
                password: password
            });

            if (authError) throw authError;
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Profile update error:", err);
        return NextResponse.json({ error: err.message || 'Failed to update profile' }, { status: 500 });
    }
}
