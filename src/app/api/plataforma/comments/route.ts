import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const lesson_id = searchParams.get('lesson_id');
    const { data: { user } } = await supabase.auth.getUser();

    if (!lesson_id) {
        return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 });
    }

    // 1. Fetch comments without join first to be safe
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('lesson_id', lesson_id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Fetch profiles manually
    const userIds = Array.from(new Set(comments.map((c: any) => c.user_id)));
    let profilesMap: Record<string, string> = {};

    if (userIds.length > 0) {
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, name')
            .in('id', userIds);

        if (profiles) {
            profiles.forEach((p: any) => {
                profilesMap[p.id] = p.name;
            });
        }
    }

    // 3. Merge data
    const commentsWithOwnership = comments.map((comment: any) => ({
        ...comment,
        profiles: { name: profilesMap[comment.user_id] || 'Aluno' },
        is_owner: user ? comment.user_id === user.id : false
    }));

    return NextResponse.json({ data: commentsWithOwnership });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { lesson_id, content } = json;

        if (!content || !lesson_id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        // 1. Insert Comment
        const { data: newComment, error } = await supabase
            .from('comments')
            .insert({
                lesson_id,
                content,
                user_id: user.id
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 2. Fetch Profile Name
        const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', user.id)
            .single();

        const mergedData = {
            ...newComment,
            profiles: { name: profile?.name || 'Aluno' },
            is_owner: true
        };

        return NextResponse.json({ data: mergedData });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

import { createAdminClient } from '@/lib/supabase-admin';

export async function DELETE(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        console.log(`[DELETE Comment] Attempting to delete comment ${id} by user ${user.id}`);

        // First get the comment
        const { data: comment, error: fetchError } = await supabase
            .from('comments')
            .select('user_id')
            .eq('id', id)
            .single();

        if (fetchError || !comment) {
            console.error("[DELETE Comment] Comment not found or fetch error:", fetchError);
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Check ownership
        if (comment.user_id !== user.id) {
            console.warn(`[DELETE Comment] Forbidden: User ${user.id} tried to delete comment ${id} owned by ${comment.user_id}`);
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Use Admin Client to delete, bypassing RLS
        const supabaseAdmin = createAdminClient();
        const { error, count } = await supabaseAdmin
            .from('comments')
            .delete({ count: 'exact' })
            .eq('id', id);

        if (error) {
            console.error("[DELETE Comment] Supabase Admin delete error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (count === 0) {
            console.error("[DELETE Comment] Deletion returned 0 rows even with Admin.");
            return NextResponse.json({ error: 'Deletion failed (Not found?)' }, { status: 404 });
        }

        console.log(`[DELETE Comment] Successfully deleted comment ${id}`);
        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("[DELETE Comment] Unexpected error:", err);
        return NextResponse.json({ error: err.message || 'Invalid request' }, { status: 400 });
    }
}
