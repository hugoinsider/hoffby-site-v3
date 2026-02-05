import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { modules, deletedModuleIds, deletedLessonIds } = json;
        // Await the params for Next.js 15 compat
        const { id: courseId } = await params;

        // 1. Handle Deletions
        if (deletedLessonIds && deletedLessonIds.length > 0) {
            await supabase.from('lessons').delete().in('id', deletedLessonIds);
        }
        if (deletedModuleIds && deletedModuleIds.length > 0) {
            await supabase.from('modules').delete().in('id', deletedModuleIds);
        }

        // 2. Process Modules and Lessons
        // We will do this differently to avoid complex ID mapping manually if possible.
        // However, since we need to link lessons to new modules, we must do it essentially sequentially or in managed batches.
        // But doing it SERVER SIDE saves the HTTP overhead and Auth checks (only 1 check).

        const updatedModulesResult = [];

        for (let i = 0; i < modules.length; i++) {
            const mod = modules[i];
            const isTempModule = mod.id.toString().startsWith('temp');

            const modulePayload = {
                course_id: courseId,
                title: mod.title,
                order: i
            };

            let savedModuleId;

            if (isTempModule) {
                const { data: newMod, error } = await supabase
                    .from('modules')
                    .insert(modulePayload)
                    .select('id')
                    .single();
                if (error) throw error;
                savedModuleId = newMod.id;
            } else {
                const { data: updatedMod, error } = await supabase
                    .from('modules')
                    .update(modulePayload)
                    .eq('id', mod.id)
                    .select('id')
                    .single();
                if (error) throw error;
                savedModuleId = updatedMod.id;
            }

            // Process Lessons for this Module
            if (mod.lessons && mod.lessons.length > 0) {
                for (let j = 0; j < mod.lessons.length; j++) {
                    const lesson = mod.lessons[j];
                    const isTempLesson = lesson.id.toString().startsWith('temp');

                    const lessonPayload = {
                        module_id: savedModuleId,
                        title: lesson.title,
                        video_url: lesson.video_url,
                        is_free: lesson.is_free,
                        comments_enabled: lesson.comments_enabled,
                        order: j
                    };

                    if (isTempLesson) {
                        const { error } = await supabase.from('lessons').insert(lessonPayload);
                        if (error) throw error;
                    } else {
                        const { error } = await supabase
                            .from('lessons')
                            .update(lessonPayload)
                            .eq('id', lesson.id);
                        if (error) throw error;
                    }
                }
            }

            updatedModulesResult.push({ ...mod, id: savedModuleId });
        }

        return NextResponse.json({ success: true, modules: updatedModulesResult });

    } catch (err: any) {
        console.error("Sync Error:", err);
        return NextResponse.json({ error: err.message || 'Sync failed' }, { status: 500 });
    }
}
