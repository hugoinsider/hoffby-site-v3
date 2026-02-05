"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Video, MessageSquare, Trash2, Eye, EyeOff, PlayCircle } from "lucide-react";

export default function SortableLesson({ lesson, onDelete, onUpdate, isOverlay }: { lesson: any, onDelete?: any, onUpdate?: any, isOverlay?: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: lesson.id, data: { type: "lesson", lesson } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        position: 'relative' as const,
        zIndex: isDragging ? 100 : 1,
    };

    if (isOverlay) {
        return (
            <div className="bg-[#2C2C2E] border border-[#0071E3] rounded-[16px] p-4 flex items-center gap-3 shadow-2xl">
                <GripVertical className="w-5 h-5 text-[#0071E3]" />
                <span className="text-[#F5F5F7] font-medium text-[15px]">{lesson.title}</span>
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-[#2C2C2E] border border-transparent hover:border-[#38383A] rounded-[16px] p-4 group transition-all"
        >
            <div className="flex items-center gap-3">
                <button {...attributes} {...listeners} className="cursor-grab text-[#636366] hover:text-[#F5F5F7] transition-colors">
                    <GripVertical className="w-5 h-5" />
                </button>

                <div className={`p-2 rounded-[10px] ${lesson.is_free ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#0071E3]/10 text-[#0071E3]'}`}>
                    <PlayCircle className="w-4 h-4" />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                    <input
                        value={lesson.title}
                        onChange={(e) => onUpdate(lesson.id, { title: e.target.value })}
                        className="bg-transparent border-none focus:outline-none text-[#F5F5F7] text-[15px] font-medium w-full placeholder:text-[#636366]"
                        placeholder="Título da aula..."
                    />
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onUpdate(lesson.id, { is_free: !lesson.is_free })}
                        title={lesson.is_free ? "Prévia Grátis: Sim" : "Prévia Grátis: Não"}
                        className={`p-2 rounded-full transition-colors ${lesson.is_free ? 'text-emerald-400 bg-emerald-500/10' : 'text-[#636366] hover:text-[#F5F5F7] hover:bg-[#38383A]'}`}
                    >
                        {lesson.is_free ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => onUpdate(lesson.id, { comments_enabled: !lesson.comments_enabled })}
                        title="Comentários"
                        className={`p-2 rounded-full transition-colors ${lesson.comments_enabled ? 'text-[#0071E3] bg-[#0071E3]/10' : 'text-[#636366] hover:text-[#F5F5F7] hover:bg-[#38383A]'}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-[#38383A] mx-1" />
                    <button
                        onClick={() => onDelete(lesson.id)}
                        className="p-2 text-[#636366] hover:text-[#FF453A] hover:bg-[#FF453A]/10 rounded-full transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="mt-3 pl-10 pr-2">
                <input
                    value={lesson.video_url || ''}
                    onChange={(e) => onUpdate(lesson.id, { video_url: e.target.value })}
                    placeholder="URL do vídeo (YouTube, Vimeo, etc)..."
                    className="w-full bg-[#1C1C1E] border border-transparent focus:border-[#0071E3]/50 rounded-[8px] px-3 py-1.5 text-[13px] text-[#F5F5F7] placeholder:text-[#636366] focus:outline-none transition-all"
                />
            </div>
        </div>
    );
}
