import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Check if user is admin to decide whether to show drafts
    // For now, returning all for authenticated users as per RLS policy (we need to refine this logic)
    // Assuming 'is_admin' custom claim or similar logic later.
    // For now, we rely on Supabase RLS policies defined in SQL.

    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { title, description, slug, price } = json;

        if (!title || !slug) {
            return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('courses')
            .insert({
                title,
                description,
                slug,
                price,
                is_published: false, // Default to draft
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
