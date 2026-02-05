"use client";

import { useState, useEffect } from "react";
import { Send, User, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function CommentsSection({ lessonId, onShowToast }: { lessonId: string, onShowToast: (msg: string, type: any) => void }) {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    // Confirm Modal State
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        commentId: string | null;
    }>({
        isOpen: false,
        commentId: null
    });

    useEffect(() => {
        if (lessonId) {
            setComments([]); // Clear previous comments immediately
            fetchComments();
        }
    }, [lessonId]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/plataforma/comments?lesson_id=${lessonId}`);
            const data = await res.json();
            if (data.data) setComments(data.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setLoading(true);

        try {
            const res = await fetch('/api/plataforma/comments', {
                method: 'POST',
                body: JSON.stringify({ lesson_id: lessonId, content: newComment })
            });

            if (!res.ok) throw new Error("Falha ao enviar");

            const json = await res.json();
            if (json.data) {
                setComments([json.data, ...comments]);
                setNewComment("");
                onShowToast("Comentário enviado com sucesso!", "success");
            }
        } catch (e) {
            console.error(e);
            onShowToast("Erro ao enviar comentário", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const idToDelete = confirmModal.commentId;
        if (!idToDelete) return;

        try {
            const res = await fetch(`/api/plataforma/comments?id=${idToDelete}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error("Falha ao excluir");

            // Optimistic update
            setComments(prev => prev.filter(c => c.id !== idToDelete));
            onShowToast("Comentário excluído com sucesso!", "success");

            // Re-fetch to ensure sync (optional, but safer)
            // fetchComments(); 
        } catch (e) {
            console.error(e);
            onShowToast("Erro ao excluir comentário", "error");
            // If failed, maybe revert or just re-fetch
            fetchComments();
        } finally {
            setConfirmModal({ isOpen: false, commentId: null });
        }
    };

    return (
        <div className="mt-8">
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, commentId: null })}
                onConfirm={handleDelete}
                title="Excluir Comentário?"
                description="Essa ação não pode ser desfeita."
                confirmText="Sim, excluir"
                isDestructive
            />

            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                Comentários <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-400">{comments.length}</span>
            </h3>

            <form onSubmit={handleSubmit} className="mb-8 relative">
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escreva um comentário..."
                    className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 pl-4 pr-12 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                />
                <button
                    disabled={loading || !newComment.trim()}
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>

            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center shrink-0 border border-white/5">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-300">
                                        {comment.profiles?.name || "Aluno"}
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        {new Date(comment.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {comment.is_owner && (
                                    <button
                                        onClick={() => setConfirmModal({ isOpen: true, commentId: comment.id })}
                                        className="text-slate-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{comment.content}</p>
                        </div>
                    </div>
                ))}

                {comments.length === 0 && (
                    <div className="text-center py-10 text-slate-600 text-sm">
                        Seja o primeiro a comentar!
                    </div>
                )}
            </div>
        </div>
    );
}
