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
        const { module: mod, courseId } = json;

        if (!mod || !courseId) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

        const isTemp = mod.id.toString().startsWith('temp');

        const payload = {
            title: mod.title,
            course_id: courseId,
            order: mod.order || 0
        };

        let result;

        if (isTemp) {
            // Insert
            const { data, error } = await supabase
                .from('modules')
                .insert(payload)
                .select()
                .single();
            if (error) throw error;
            result = data;
        } else {
            // Update
            const { data, error } = await supabase
                .from('modules')
                .update(payload)
                .eq('id', mod.id)
                .select()
                .single();
            if (error) throw error;
            result = data;
        }

        return NextResponse.json({ data: result, oldId: mod.id });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
