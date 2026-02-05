import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { user_id, course_id } = json;
        // user_id here is the STUDENT ID being enrolled, not the current user (admin) ideally.

        if (!user_id || !course_id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        const { data, error } = await supabase
            .from('enrollments')
            .insert({
                user_id,
                course_id
            })
            .select()
            .single();

        if (error) {
            // Handle unique constraint (already enrolled) gracefully?
            if (error.code === '23505') { // Unique violation
                return NextResponse.json({ message: 'Already enrolled' });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // List my enrollments
    const { data, error } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}
