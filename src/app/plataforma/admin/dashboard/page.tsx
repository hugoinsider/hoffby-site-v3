"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, BookOpen, Edit3, DollarSign, Eye, EyeOff, Trash2, Type } from "lucide-react";
import { usePlatformI18n } from "@/context/PlatformI18nContext";
import { useRouter } from "next/navigation";
import { PriceModal } from "@/components/plataforma/admin/PriceModal";
import { RenameCourseModal } from "@/components/plataforma/admin/RenameCourseModal";
import { Toast, ToastType } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminDashboard() {
    const { t } = usePlatformI18n();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    // UI State
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [priceModalOpen, setPriceModalOpen] = useState(false);
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const [toast, setToast] = useState<{ message: string, type: ToastType, visible: boolean }>({
        message: "", type: "info", visible: false
    });

    const showToast = (message: string, type: ToastType = "info") => {
        setToast({ message, type, visible: true });
    };

    const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

    useEffect(() => {
        fetchCourses();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await fetch('/api/plataforma/courses');
            const json = await res.json();
            if (json.data) setCourses(json.data);
        } catch (e) {
            console.error("Failed to fetch courses");
            showToast("Erro ao carregar cursos", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCourse = async () => {
        setCreating(true);
        try {
            const res = await fetch('/api/plataforma/courses/create', { method: 'POST' });
            const data = await res.json();
            if (data.id) {
                router.push(`/plataforma/admin/courses/${data.id}`);
            }
        } catch (e) {
            console.error("Failed to create course");
            showToast("Erro ao criar curso", "error");
            setCreating(false);
        }
    };

    const handleUpdateCourse = async (courseId: string, updates: any) => {
        try {
            const res = await fetch(`/api/plataforma/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (res.ok) {
                setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updates } : c));
                showToast("Curso atualizado!", "success");
            } else {
                showToast("Erro ao atualizar", "error");
            }
        } catch (e) {
            console.error(e);
            showToast("Erro de conexão", "error");
        }
    };

    const handlePublishToggle = async (course: any) => {
        await handleUpdateCourse(course.id, { is_published: !course.is_published });
        setActiveMenu(null);
    };

    const confirmDelete = (courseId: string) => {
        setCourseToDelete(courseId);
        setConfirmModalOpen(true);
        setActiveMenu(null);
    };

    const handleDelete = async () => {
        if (!courseToDelete) return;
        setDeleting(true);

        try {
            const res = await fetch(`/api/plataforma/courses/${courseToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                setCourses(prev => prev.filter(c => c.id !== courseToDelete));
                showToast("Curso excluído", "success");
            } else {
                showToast("Erro ao excluir", "error");
            }
        } catch (e) {
            showToast("Erro ao excluir", "error");
        } finally {
            setDeleting(false);
            setConfirmModalOpen(false);
            setCourseToDelete(null);
        }
    };

    const openPriceModal = (course: any) => {
        setSelectedCourse(course);
        setPriceModalOpen(true);
        setActiveMenu(null);
    };

    const openRenameModal = (course: any) => {
        setSelectedCourse(course);
        setRenameModalOpen(true);
        setActiveMenu(null);
    };

    const handlePriceSave = async (courseId: string, newPrice: number) => {
        await handleUpdateCourse(courseId, { price: newPrice });
    };

    const handleRenameSave = async (courseId: string, newTitle: string) => {
        await handleUpdateCourse(courseId, { title: newTitle });
    };

    const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={closeToast} />

            {priceModalOpen && selectedCourse && (
                <PriceModal
                    isOpen={priceModalOpen}
                    onClose={() => setPriceModalOpen(false)}
                    course={selectedCourse}
                    onSave={handlePriceSave}
                />
            )}

            {renameModalOpen && selectedCourse && (
                <RenameCourseModal
                    isOpen={renameModalOpen}
                    onClose={() => setRenameModalOpen(false)}
                    course={selectedCourse}
                    onSave={handleRenameSave}
                />
            )}

            <ConfirmModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDelete}
                title="Excluir Curso"
                description="Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita e todos os dados associados serão perdidos."
                confirmText="Sim, excluir curso"
                cancelText="Cancelar"
                isDestructive={true}
                loading={deleting}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-semibold text-[#F5F5F7] tracking-tight">{t("dashboard.title")}</h2>
                    <p className="text-[#86868B] mt-1 text-[15px]">Gerencie seus cursos e alunos.</p>
                </div>
                <button
                    onClick={handleCreateCourse}
                    disabled={creating}
                    className="flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white px-5 py-2 rounded-full font-medium text-[15px] shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                    {creating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
                    {creating ? "Criando..." : "Novo Curso"}
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center bg-[#1C1C1E] border border-[#38383A] rounded-[12px] p-2 w-full max-w-md focus-within:ring-1 focus-within:ring-[#0071E3] transition-all">
                <Search className="w-5 h-5 text-[#86868B] ml-2" strokeWidth={1.5} />
                <input
                    type="text"
                    placeholder="Buscar cursos..."
                    className="bg-transparent border-none focus:outline-none text-[#F5F5F7] placeholder:text-[#86868B] w-full px-3 py-1.5 text-[15px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Courses Grid */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.length === 0 && (
                        <div className="col-span-full text-center py-24 text-[#86868B] border border-dashed border-[#38383A] rounded-[24px]">
                            Nenhum curso encontrado. Crie o primeiro!
                        </div>
                    )}
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="group relative bg-[#1C1C1E] rounded-[24px] p-6 hover:bg-[#2C2C2E] transition-all duration-300 shadow-sm border border-transparent hover:border-[#38383A]">

                            {/* Menu Button */}
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === course.id ? null : course.id); }}
                                    className="p-2 text-[#86868B] hover:text-[#F5F5F7] rounded-full hover:bg-[#3A3A3C] transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5" strokeWidth={1.5} />
                                </button>

                                {activeMenu === course.id && (
                                    <div ref={menuRef} className="absolute right-0 top-10 w-48 bg-[#252527] border border-[#38383A] rounded-[14px] shadow-2xl p-1.5 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-150">
                                        <Link
                                            href={`/plataforma/admin/courses/${course.id}`}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-[14px] text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-[8px] transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                                            Editar Conteúdo
                                        </Link>
                                        <button
                                            onClick={() => openRenameModal(course)}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-[14px] text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-[8px] transition-colors text-left"
                                        >
                                            <Type className="w-4 h-4" strokeWidth={1.5} />
                                            Renomear
                                        </button>
                                        <button
                                            onClick={() => openPriceModal(course)}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-[14px] text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-[8px] transition-colors text-left"
                                        >
                                            <DollarSign className="w-4 h-4" strokeWidth={1.5} />
                                            Definir Preço
                                        </button>
                                        <button
                                            onClick={() => handlePublishToggle(course)}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-[14px] text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-[8px] transition-colors text-left"
                                        >
                                            {course.is_published ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                                            {course.is_published ? "Despublicar" : "Publicar"}
                                        </button>
                                        <div className="h-px bg-[#38383A] my-1" />
                                        <button
                                            onClick={() => confirmDelete(course.id)}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-[14px] text-red-500 hover:bg-[#3A3A3C] rounded-[8px] transition-colors text-left"
                                        >
                                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                            Excluir
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Link href={`/plataforma/admin/courses/${course.id}`} className="block">
                                <div className="w-14 h-14 rounded-[16px] bg-[#2C2C2E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                                    <BookOpen className="w-7 h-7 text-[#0071E3]" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-[19px] font-semibold text-[#F5F5F7] mb-2 truncate leading-snug">
                                    {course.title}
                                </h3>

                                <div className="flex items-center text-[13px] text-[#86868B] gap-3 mb-5 font-medium">
                                    <span>{0} módulos</span>
                                    <span className="w-1 h-1 rounded-full bg-[#48484A]" />
                                    <span className={course.is_published ? 'text-[#30D158]' : 'text-[#FF9F0A]'}>
                                        {course.is_published ? "Publicado" : "Rascunho"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-5 border-t border-[#38383A]">
                                    <span className="text-[#86868B] text-[13px]">Preço</span>
                                    <span className="font-semibold text-[#F5F5F7] tracking-tight">
                                        {course.price ? `R$ ${course.price.toFixed(2).replace('.', ',')}` : 'Grátis'}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
