import { createClient } from '@/lib/supabase-server';
import { notFound, redirect } from 'next/navigation';
import CourseEditor from '@/components/plataforma/admin/CourseEditor';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CourseEditorPage({
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
        // For dev/test if DB is empty, might want to show empty editor?
        // But strict logic says 404.
        // notFound();
        console.error("Course load error", error);
    }

    return (
        <div className="space-y-6">
            <Link href="/plataforma/admin/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Dashboard
            </Link>

            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 mb-8">
                <h1 className="text-xl font-bold text-slate-200 mb-1">{course?.title || "Novo Curso"}</h1>
                <p className="text-slate-500 text-sm">Editando estrutura / {id}</p>
            </div>

            <CourseEditor courseId={id} initialData={course} />
        </div>
    );
}
