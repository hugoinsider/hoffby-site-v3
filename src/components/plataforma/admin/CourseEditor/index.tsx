"use client";

import { useState, useMemo, useEffect } from "react";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import SortableModule from "./SortableModule";
import SortableLesson from "./SortableLesson";
import { Plus, Save, Loader2, LayoutGrid, List } from "lucide-react";
import { createPortal } from "react-dom";
import { Toast, ToastType } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

// Helper to generate temp IDs for optimistic UI
const generateId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function CourseEditor({ courseId, initialData }: { courseId: string, initialData?: any }) {
    const [modules, setModules] = useState<any[]>(initialData?.modules || []);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<any | null>(null);
    const [saving, setSaving] = useState(false);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: ToastType, visible: boolean }>({
        message: "", type: "info", visible: false
    });

    // Confirm Modal State
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: () => { },
    });

    const [deletedModuleIds, setDeletedModuleIds] = useState<string[]>([]);
    const [deletedLessonIds, setDeletedLessonIds] = useState<string[]>([]);

    const showToast = (message: string, type: ToastType = "info") => {
        setToast({ message, type, visible: true });
    };

    const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

    useEffect(() => {
        if (initialData?.modules) {
            setModules(initialData.modules);
            // Clear deletions on load/reset
            setDeletedModuleIds([]);
            setDeletedLessonIds([]);
        }
    }, [initialData]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // --- Actions ---

    const addModule = () => {
        setModules([...modules, { id: generateId(), title: "Novo Módulo", lessons: [] }]);
    };

    const addLesson = (moduleId: string) => {
        setModules(modules.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    lessons: [...(m.lessons || []), { id: generateId(), title: "Nova Aula", video_url: "", is_free: false, comments_enabled: true }]
                };
            }
            return m;
        }));
    };

    const updateModule = (id: string, updates: any) => {
        setModules(modules.map(m => m.id === id ? { ...m, ...updates } : m));
    };

    const deleteModule = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Excluir Módulo?",
            description: "Tem certeza que deseja diminuir este módulo? Todas as aulas dentro dele serão excluídas permanentemente.",
            onConfirm: () => {
                if (!id.toString().startsWith('temp')) {
                    setDeletedModuleIds(prev => [...prev, id]);
                }
                setModules(prev => prev.filter(m => m.id !== id));
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const updateLesson = (id: string, updates: any) => {
        setModules(modules.map(m => ({
            ...m,
            lessons: m.lessons?.map((l: any) => l.id === id ? { ...l, ...updates } : l)
        })));
    };

    const deleteLesson = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Excluir Aula?",
            description: "Essa ação não pode ser desfeita.",
            onConfirm: () => {
                if (!id.toString().startsWith('temp')) {
                    setDeletedLessonIds(prev => [...prev, id]);
                }
                setModules(prev => prev.map(m => ({
                    ...m,
                    lessons: m.lessons?.filter((l: any) => l.id !== id)
                })));
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/plataforma/courses/${courseId}/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    modules,
                    deletedModuleIds,
                    deletedLessonIds
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to save course");
            }

            const { modules: savedModules } = await res.json();

            setModules(savedModules);
            setDeletedModuleIds([]);
            setDeletedLessonIds([]);
            showToast("Curso salvo com sucesso!", "success");
        } catch (e: any) {
            console.error(e);
            showToast(`Erro ao salvar: ${e.message}`, "error");
        } finally {
            setSaving(false);
        }
    };


    // --- DnD Logic ---

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
        const type = active.data.current?.type;

        if (type === 'module') {
            setActiveItem(modules.find(m => m.id === active.id));
        } else if (type === 'lesson') {
            // Find lesson
            for (const m of modules) {
                const l = m.lessons?.find((l: any) => l.id === active.id);
                if (l) {
                    setActiveItem(l);
                    break;
                }
            }
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;
        // Basic drag over logic... similar to before
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveItem(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeType = active.data.current?.type;

        if (activeType === 'module') {
            setModules((items) => {
                const oldIndex = items.findIndex(m => m.id === activeId);
                const newIndex = items.findIndex(m => m.id === overId);
                return arrayMove(items, oldIndex, newIndex);
            });
        } else {
            // Lesson reorder simple logic (same module)
            const sourceModule = modules.find(m => m.lessons.some((l: any) => l.id === activeId));
            const destModule = modules.find(m => m.lessons.some((l: any) => l.id === overId));

            if (sourceModule && destModule && sourceModule.id === destModule.id) {
                setModules(prev => {
                    return prev.map(m => {
                        if (m.id === sourceModule.id) {
                            const oldIndex = m.lessons.findIndex((l: any) => l.id === activeId);
                            const newIndex = m.lessons.findIndex((l: any) => l.id === overId);
                            return { ...m, lessons: arrayMove(m.lessons, oldIndex, newIndex) };
                        }
                        return m;
                    })
                });
            }
        }
    };


    return (
        <div className="w-full max-w-[98%] mx-auto pb-32 animate-fade-in text-white/90">
            <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={closeToast} />
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                description={confirmModal.description}
                isDestructive={true}
                confirmText="Sim, excluir"
            />

            {/* Sticky Header with Glassmorphism */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0A0A0B]/80 backdrop-blur-2xl py-6 z-40 border-b border-white/5 transition-all">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl">
                        <LayoutGrid className="w-6 h-6 text-[#0071E3]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">Estrutura do Curso</h1>
                        <p className="text-[#86868B] text-[15px]">Arraste para organizar módulos e aulas.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={addModule}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1C1E] border border-[#38383A] text-[#F5F5F7] hover:bg-[#2C2C2E] transition-all font-medium text-[15px] shadow-sm active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Novo Módulo
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-lg shadow-[#0071E3]/20 transition-all font-medium text-[15px] disabled:opacity-50 active:scale-95"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <div className="space-y-6">
                    <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        {modules.map((module) => (
                            <SortableModule
                                key={module.id}
                                module={module}
                                lessons={module.lessons || []}
                                onUpdateModule={updateModule}
                                onDeleteModule={deleteModule}
                                onAddLesson={addLesson}
                                onUpdateLesson={updateLesson}
                                onDeleteLesson={deleteLesson}
                            />
                        ))}
                    </SortableContext>
                </div>

                {/* Overlay for Dragging */}
                {createPortal(
                    <DragOverlay>
                        {activeItem && activeItem.lessons !== undefined ? (
                            <div className="opacity-95 scale-[1.02]">
                                <SortableModule module={activeItem} lessons={activeItem.lessons} onUpdateModule={() => { }} onDeleteModule={() => { }} onAddLesson={() => { }} onUpdateLesson={() => { }} onDeleteLesson={() => { }} isOverlay />
                            </div>
                        ) : activeItem ? (
                            <div className="opacity-95 scale-[1.02]">
                                <SortableLesson lesson={activeItem} onUpdate={() => { }} onDelete={() => { }} isOverlay />
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            {modules.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 rounded-[32px] border border-dashed border-[#38383A] bg-[#1C1C1E]/50">
                    <div className="w-16 h-16 bg-[#2C2C2E] rounded-full flex items-center justify-center mb-4 text-[#86868B]">
                        <List className="w-8 h-8" />
                    </div>
                    <p className="text-[#86868B] text-lg mb-6">Nenhum módulo criado ainda.</p>
                    <button
                        onClick={addModule}
                        className="px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium shadow-lg transition-all active:scale-95"
                    >
                        Criar Primeiro Módulo
                    </button>
                </div>
            )}
        </div>
    );
}
