import { createClient } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const lesson_id = searchParams.get('lesson_id');
    const { data: { user } } = await supabase.auth.getUser();

    if (!lesson_id) {
        return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 });
    }

    // Get count
    const { count, error: countError } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('lesson_id', lesson_id);

    // Get user status
    let liked = false;
    if (user) {
        const { data } = await supabase
            .from('likes')
            .select('id')
            .eq('lesson_id', lesson_id)
            .eq('user_id', user.id)
            .single();
        if (data) liked = true;
    }

    return NextResponse.json({ count: count || 0, liked });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { lesson_id } = json;

        if (!lesson_id) {
            return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 });
        }

        // Use Admin Client to bypass RLS
        const supabaseAdmin = createAdminClient();

        // Check if exists
        const { data: existing, error: fetchError } = await supabaseAdmin
            .from('likes')
            .select('id')
            .eq('lesson_id', lesson_id)
            .eq('user_id', user.id)
            .maybeSingle();

        if (fetchError) {
            console.error("Error fetching like:", fetchError);
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        let result;
        if (existing) {
            // Unlike
            const { error } = await supabaseAdmin.from('likes').delete().eq('id', existing.id);
            if (error) throw error;
            result = { liked: false };
        } else {
            // Like
            const { error } = await supabaseAdmin.from('likes').insert({ lesson_id, user_id: user.id });
            if (error) throw error;
            result = { liked: true };
        }

        return NextResponse.json(result);
    } catch (err: any) {
        console.error("Like API Error:", err);
        return NextResponse.json({ error: err.message || 'Invalid request' }, { status: 500 });
    }
}
