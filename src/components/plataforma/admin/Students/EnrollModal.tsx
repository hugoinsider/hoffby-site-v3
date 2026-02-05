"use client";

import { useState, useEffect } from "react";
import { BookOpen, Check } from "lucide-react";

interface EnrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: any;
    courses: any[];
    onEnroll: (studentId: string, courseId: string, action: 'enroll' | 'unenroll') => Promise<void>;
    onSuccess?: () => void;
}

export function EnrollModal({ isOpen, onClose, student, courses, onEnroll, onSuccess }: EnrollModalProps) {
    if (!isOpen) return null;

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Initialize with student's current enrollments when modal opens
    useEffect(() => {
        if (student?.enrolledCourses) {
            setSelectedCourses(student.enrolledCourses);
        } else {
            setSelectedCourses([]);
        }
    }, [student, isOpen]);

    const toggleCourse = (courseId: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Identify changes
        const currentEnrollments = student.enrolledCourses || [];
        const toAdd = selectedCourses.filter(id => !currentEnrollments.includes(id));
        const toRemove = currentEnrollments.filter((id: string) => !selectedCourses.includes(id));

        // Process additions
        for (const courseId of toAdd) {
            await onEnroll(student.id, courseId, 'enroll');
        }

        // Process removals
        for (const courseId of toRemove) {
            await onEnroll(student.id, courseId, 'unenroll');
        }

        setLoading(false);
        if (onSuccess) onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-[#38383A] bg-[#1C1C1E] flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-[#F5F5F7]">Gerenciar Matrículas</h3>
                        <p className="text-[#86868B] text-[15px] mt-1">
                            Selecione os cursos para <span className="text-[#F5F5F7] font-medium">{student.email}</span>
                        </p>
                    </div>
                </div>

                <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar bg-[#1C1C1E]">
                    {courses.length === 0 ? (
                        <div className="text-center py-8 text-[#86868B]">Nenhum curso disponível.</div>
                    ) : (
                        <div className="space-y-2">
                            {courses.map((c: any) => {
                                const isSelected = selectedCourses.includes(c.id);
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => toggleCourse(c.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-[16px] border transition-all duration-200 group text-left ${isSelected
                                            ? "bg-[#0071E3]/10 border-[#0071E3] shadow-[0_0_20px_rgba(0,113,227,0.1)]"
                                            : "bg-[#2C2C2E]/50 border-transparent hover:bg-[#2C2C2E]"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-300 ${isSelected ? "bg-[#0071E3] text-white" : "bg-[#3A3A3C] text-[#86868B]"
                                                }`}>
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className={`font-semibold block truncate text-[15px] ${isSelected ? "text-[#F5F5F7]" : "text-[#98989D]"}`}>
                                                    {c.title}
                                                </span>
                                                <span className="text-[12px] text-[#636366] font-medium">
                                                    {isSelected ? "Acesso Permitido" : "Sem Acesso"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? "border-[#0071E3] bg-[#0071E3]" : "border-[#48484A] group-hover:border-[#636366]"
                                            }`}>
                                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="p-5 border-t border-[#38383A] bg-[#2C2C2E]/30 flex justify-end gap-3 backdrop-blur-xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-full font-medium transition-colors text-[15px]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full font-medium shadow-lg shadow-[#0071E3]/20 disabled:opacity-50 transition-all active:scale-95 text-[15px] flex items-center gap-2"
                    >
                        {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </div>
        </div>
    );
}
