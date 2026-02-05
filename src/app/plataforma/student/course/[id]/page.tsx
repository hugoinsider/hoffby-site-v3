import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import CoursePlayer from '@/components/plataforma/student/CoursePlayer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function StudentCoursePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/plataforma/login');
    }

    // Fetch Course with Modules and Lessons
    const { data: course, error } = await supabase
        .from('courses')
        .select(`
        *,
        modules (
            *,
            lessons (*)
        )
    `)
        .eq('id', id)
        .order('order', { foreignTable: 'modules', ascending: true })
        .order('order', { foreignTable: 'modules.lessons', ascending: true })
        .single();

    if (error || !course) {
        // TODO: handle error
        return <div>Curso não encontrado</div>
    }

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col">
            <div className="mb-4 px-2">
                <Link href="/plataforma/student/dashboard" className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Voltar
                </Link>
            </div>
            <CoursePlayer course={course} />
        </div>
    );
}
