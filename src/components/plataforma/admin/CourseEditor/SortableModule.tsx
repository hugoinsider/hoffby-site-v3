"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, FolderOpen, Trash2, Plus, ChevronDown } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableLesson from "./SortableLesson";

export default function SortableModule({ module, lessons, onUpdateModule, onDeleteModule, onAddLesson, onUpdateLesson, onDeleteLesson, isOverlay }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: module.id, data: { type: "module", module } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 50 : 1,
    };

    if (isOverlay) {
        return (
            <div className="bg-[#1C1C1E] border border-[#0071E3] rounded-[24px] p-6 shadow-2xl flex items-center gap-4">
                <GripVertical className="w-6 h-6 text-[#0071E3]" />
                <span className="text-[#F5F5F7] text-xl font-semibold">{module.title}</span>
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] overflow-hidden shadow-lg transition-all group"
        >
            {/* Module Header */}
            <div className="flex items-center gap-4 p-5 bg-[#252528] border-b border-[#38383A]">
                <button {...attributes} {...listeners} className="cursor-grab text-[#636366] hover:text-[#F5F5F7] transition-colors p-1">
                    <GripVertical className="w-6 h-6" />
                </button>

                <div className="w-10 h-10 rounded-[12px] bg-[#0071E3]/10 flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-[#0071E3]" />
                </div>

                <input
                    value={module.title}
                    onChange={(e) => onUpdateModule(module.id, { title: e.target.value })}
                    className="bg-transparent border-none focus:outline-none text-[#F5F5F7] text-[17px] font-semibold flex-1 placeholder:text-[#636366]"
                    placeholder="Nome do Módulo"
                />

                <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#86868B] font-medium mr-2">
                        {lessons?.length || 0} aulas
                    </span>
                    <button
                        onClick={() => onDeleteModule(module.id)}
                        className="p-2 text-[#636366] hover:text-[#FF453A] hover:bg-[#FF453A]/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    {/* Collapsible toggle could go here */}
                </div>
            </div>

            {/* Lessons List Container */}
            <div className="p-4 bg-[#1C1C1E]">
                <div className="space-y-3 min-h-[20px]">
                    {lessons && lessons.length > 0 ? (
                        <SortableContext items={lessons.map((l: any) => l.id)} strategy={verticalListSortingStrategy}>
                            {lessons.map((lesson: any) => (
                                <SortableLesson
                                    key={lesson.id}
                                    lesson={lesson}
                                    onUpdate={onUpdateLesson}
                                    onDelete={onDeleteLesson}
                                />
                            ))}
                        </SortableContext>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-[#636366] border border-dashed border-[#38383A] rounded-[16px]">
                            <p className="text-[14px]">Este módulo ainda não tem aulas.</p>
                        </div>
                    )}

                    <button
                        onClick={() => onAddLesson(module.id)}
                        className="w-full py-3 mt-4 flex items-center justify-center gap-2 rounded-[16px] bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#86868B] hover:text-[#F5F5F7] transition-all text-[14px] font-medium group/add"
                    >
                        <div className="w-6 h-6 rounded-full bg-[#38383A] flex items-center justify-center group-hover/add:bg-[#0071E3] transition-colors">
                            <Plus className="w-3.5 h-3.5 text-[#F5F5F7] group-hover/add:text-white" />
                        </div>
                        Adicionar Nova Aula
                    </button>
                </div>
            </div>
        </div>
    );
}
