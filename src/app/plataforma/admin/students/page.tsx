"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Plus } from "lucide-react";
import { usePlatformI18n } from "@/context/PlatformI18nContext";
import { EnrollModal } from "@/components/plataforma/admin/Students/EnrollModal";
import { CreateStudentModal } from "@/components/plataforma/admin/Students/CreateStudentModal";
import { StudentListItem } from "@/components/plataforma/admin/Students/StudentListItem";
import { Toast, ToastType } from "@/components/ui/Toast";

export default function AdminStudentsPage() {
    const { t } = usePlatformI18n();
    const [students, setStudents] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: ToastType, visible: boolean }>({
        message: "", type: "info", visible: false
    });

    const showToast = (message: string, type: ToastType = "info") => {
        setToast({ message, type, visible: true });
    };

    const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

    // Modal State
    const [enrollModalOpen, setEnrollModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const fetchData = useCallback(async () => {
        try {
            const [sRes, cRes] = await Promise.all([
                fetch('/api/plataforma/admin/students'),
                fetch('/api/plataforma/courses')
            ]);

            const sJson = await sRes.json();
            const cJson = await cRes.json();

            if (sJson.data) setStudents(sJson.data);
            if (cJson.data) setCourses(cJson.data);
        } catch (e) {
            console.error("Failed to fetch data", e);
            showToast("Erro ao carregar dados", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleEnroll = useCallback(async (studentId: string, courseId: string, action: 'enroll' | 'unenroll' = 'enroll') => {
        try {
            const res = await fetch('/api/plataforma/admin/enrollments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, studentId, courseId })
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Enroll error:", err);
                if (err.error !== 'Student already enrolled') {
                    showToast(err.error || "Erro ao matricular", "error");
                }
                return;
            }

            // Silent success for bulk ops
            fetchData();
        } catch (e) {
            console.error(e);
            showToast("Erro de conexão", "error");
        }
    }, [fetchData]);

    const handleCreateStudent = useCallback(async (data: any) => {
        try {
            const res = await fetch('/api/plataforma/admin/students/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const err = await res.json();
                showToast(err.error || "Erro ao criar aluno", "error");
                return;
            }

            showToast("Aluno criado com sucesso!", "success");
            setCreateModalOpen(false);
            fetchData();
        } catch (e) {
            console.error(e);
            showToast("Erro ao criar aluno", "error");
        }
    }, [fetchData]);

    const openEnrollModal = useCallback((student: any) => {
        setSelectedStudent(student);
        setEnrollModalOpen(true);
    }, []);

    const filteredStudents = students.filter(s =>
        (s.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (s.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in p-6">
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.visible}
                onClose={closeToast}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-semibold text-[#F5F5F7] tracking-tight">Alunos</h2>
                    <p className="text-[#86868B] mt-1 text-[15px]">Gerencie matrículas e acesso dos alunos.</p>
                </div>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-[#0071E3]/20 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Novo Aluno
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center bg-[#1C1C1E] border border-[#38383A] rounded-[16px] p-2 w-full max-w-md focus-within:ring-2 focus-within:ring-[#0071E3]/50 focus-within:border-[#0071E3] transition-all">
                <Search className="w-5 h-5 text-[#86868B] ml-2" />
                <input
                    type="text"
                    placeholder="Buscar alunos por nome ou email..."
                    className="bg-transparent border-none focus:outline-none text-[#F5F5F7] placeholder:text-[#86868B] w-full px-3 py-1.5 text-[15px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* List */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] overflow-hidden shadow-sm">
                    {filteredStudents.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="w-16 h-16 bg-[#2C2C2E] rounded-full flex items-center justify-center mx-auto mb-4 text-[#86868B]">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-[#F5F5F7] font-medium mb-1">Nenhum aluno encontrado</h3>
                            <p className="text-[#86868B] text-sm">Tente buscar por outro termo.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#38383A]">
                            {filteredStudents.map((student) => (
                                <StudentListItem
                                    key={student.id}
                                    student={student}
                                    onOpenEnrollModal={openEnrollModal}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Conditionally render Modal only when open and student exists */}
            {enrollModalOpen && selectedStudent && (
                <EnrollModal
                    isOpen={enrollModalOpen}
                    onClose={() => setEnrollModalOpen(false)}
                    student={selectedStudent}
                    courses={courses}
                    onEnroll={handleEnroll}
                    onSuccess={() => showToast("Matrículas atualizadas com sucesso!", "success")}
                />
            )}

            {createModalOpen && (
                <CreateStudentModal
                    isOpen={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onCreate={handleCreateStudent}
                />
            )}
        </div>
    );
}
