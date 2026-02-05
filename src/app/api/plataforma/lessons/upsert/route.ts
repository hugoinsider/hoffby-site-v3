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
        const { lesson, moduleId } = json;

        if (!lesson || !moduleId) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

        const isTemp = lesson.id.toString().startsWith('temp');

        const payload = {
            title: lesson.title,
            module_id: moduleId,
            video_url: lesson.video_url,
            is_free: lesson.is_free,
            comments_enabled: lesson.comments_enabled,
            order: lesson.order || 0
        };

        let result;

        if (isTemp) {
            // Insert
            const { data, error } = await supabase
                .from('lessons')
                .insert(payload)
                .select()
                .single();
            if (error) throw error;
            result = data;
        } else {
            // Update
            const { data, error } = await supabase
                .from('lessons')
                .update(payload)
                .eq('id', lesson.id)
                .select()
                .single();
            if (error) throw error;
            result = data;
        }

        return NextResponse.json({ data: result, oldId: lesson.id });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
