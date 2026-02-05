"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import LessonList from "./LessonList";
import CommentsSection from "./CommentsSection";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Toast, ToastType } from "@/components/ui/Toast";

export default function CoursePlayer({ course }: { course: any }) {
    // Default to first lesson of first module
    const firstLesson = course.modules?.[0]?.lessons?.[0];
    const [currentLesson, setCurrentLesson] = useState<any>(firstLesson);
    const [liked, setLiked] = useState(false);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: ToastType, visible: boolean }>({
        message: "", type: "info", visible: false
    });

    const showToast = (message: string, type: ToastType = "info") => {
        setToast({ message, type, visible: true });
    };

    const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

    useEffect(() => {
        if (currentLesson?.id) {
            fetchLikeStatus();
        }
    }, [currentLesson]);

    const fetchLikeStatus = async () => {
        try {
            const res = await fetch(`/api/plataforma/likes?lesson_id=${currentLesson.id}`);
            const data = await res.json();
            setLiked(data.liked);
        } catch (e) {
            console.error("Failed to fetch like status", e);
        }
    };

    const handleLike = async () => {
        if (!currentLesson) return;
        // Optimistic toggle
        setLiked(!liked);
        try {
            const res = await fetch('/api/plataforma/likes', {
                method: 'POST',
                body: JSON.stringify({ lesson_id: currentLesson.id })
            });
            if (!res.ok) throw new Error("Falha ao registrar like");

            // Optional: Show toast only on actual error to keep UI clean, 
            // OR show on success as requested "em caso de erro ou sucess"
            // I'll add success toast for clarity since user asked explicitly.
            if (!liked) {
                showToast("Aula marcada como 'Gostei'!", "success");
            }
        } catch (e) {
            console.error(e);
            setLiked(!liked); // Revert
            showToast("Erro ao registrar like", "error");
        }
    };

    if (!course) return null;

    return (
        <div className="flex flex-col lg:flex-row h-full gap-6 relative">
            <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={closeToast} />

            {/* Main Content (Video) */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="relative">
                    {currentLesson ? (
                        <VideoPlayer url={currentLesson.video_url} title={currentLesson.title} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 aspect-video bg-black rounded-xl border border-white/5">
                            Selecione uma aula
                        </div>
                    )}
                </div>

                <div className="mt-6 px-2">
                    <h1 className="text-2xl font-bold text-slate-100 mb-2">{currentLesson?.title || course.title}</h1>
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${liked ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/5 hover:bg-white/10 text-slate-300'}`}
                        >
                            <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} strokeWidth={1.5} />
                            <span>{liked ? 'Gostei' : 'Gostei'}</span>
                        </button>

                        {currentLesson?.comments_enabled && (
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                                <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                                <span>Comentários</span>
                            </button>
                        )}
                    </div>

                    <div className="prose prose-invert max-w-none mb-12">
                        <h3 className="text-lg font-medium text-slate-200">Descrição</h3>
                        <p className="text-slate-400">{currentLesson?.description || "Sem descrição."}</p>
                    </div>

                    {currentLesson?.comments_enabled && (
                        <div className="border-t border-white/5 pt-8 pb-20">
                            <CommentsSection lessonId={currentLesson.id} onShowToast={showToast} />
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar (Lesson List) */}
            <div className="w-full lg:w-96 bg-[#121214] border border-white/5 rounded-2xl flex flex-col h-full overflow-hidden shrink-0">
                <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="font-bold text-slate-200">Conteúdo do Curso</h2>
                    <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[10%]" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">10% concluído</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2">
                    <LessonList
                        modules={course.modules}
                        currentLessonId={currentLesson?.id}
                        onSelectLesson={setCurrentLesson}
                    />
                </div>
            </div>

        </div>
    );
}
