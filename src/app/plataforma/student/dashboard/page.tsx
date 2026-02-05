"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircle, Lock, Clock, Search, BookOpen, ChevronRight } from "lucide-react";
import { usePlatformI18n } from "@/context/PlatformI18nContext";
import { Toast, ToastType } from "@/components/ui/Toast";

export default function StudentDashboard() {
    const { t } = usePlatformI18n();
    const [courses, setCourses] = useState<any[]>([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [coursesRes, enrollmentsRes] = await Promise.all([
                fetch('/api/plataforma/courses'),
                fetch('/api/plataforma/enrollments')
            ]);

            const coursesJson = await coursesRes.json();
            const enrollmentsJson = await enrollmentsRes.json();

            if (coursesJson.data) {
                // Filter only published courses for students
                setCourses(coursesJson.data.filter((c: any) => c.is_published));
            }

            if (enrollmentsJson.data) {
                const ids = new Set(enrollmentsJson.data.map((e: any) => e.course_id));
                setEnrolledCourseIds(ids as Set<string>);
            }

        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
            showToast("Erro ao carregar cursos", "error");
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Separate enrolled (my courses) from others (catalog)
    const myCourses = filteredCourses.filter(c => enrolledCourseIds.has(c.id));
    const otherCourses = filteredCourses.filter(c => !enrolledCourseIds.has(c.id));

    return (
        <div className="space-y-12 animate-fade-in pb-12">
            <Toast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={closeToast} />

            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#F5F5F7] tracking-tight">Meus Cursos</h1>
                    <p className="text-[#86868B] mt-1 text-[15px]">Continue de onde parou.</p>
                </div>

                <div className="flex items-center bg-[#1C1C1E] border border-[#38383A] rounded-[12px] p-2 w-full max-w-md focus-within:ring-1 focus-within:ring-[#0071E3] transition-all">
                    <Search className="w-5 h-5 text-[#86868B] ml-2" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        className="bg-transparent border-none focus:outline-none text-[#F5F5F7] placeholder:text-[#86868B] w-full px-3 py-1.5 text-[15px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="space-y-12">

                    {/* My Courses Section */}
                    {myCourses.length > 0 && (
                        <section className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myCourses.map(course => (
                                    <Link key={course.id} href={`/plataforma/student/course/${course.id}`} className="group block">
                                        <div className="bg-[#1C1C1E] rounded-[24px] p-6 hover:bg-[#2C2C2E] transition-all duration-300 shadow-sm border border-transparent hover:border-[#38383A] h-full flex flex-col relative overflow-hidden">

                                            {/* Glow Effect */}
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0071E3]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="mb-6 relative">
                                                <div className="w-16 h-16 rounded-[20px] bg-[#2C2C2E] group-hover:bg-[#3A3A3C] flex items-center justify-center transition-colors shadow-inner">
                                                    <BookOpen className="w-8 h-8 text-[#0071E3]" strokeWidth={1.5} />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-[20px] font-semibold text-[#F5F5F7] mb-2 leading-snug group-hover:text-white transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-[14px] text-[#86868B] line-clamp-2">
                                                    {course.description || "Sem descrição disponível."}
                                                </p>
                                            </div>

                                            <div className="mt-8 flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[12px] font-medium text-[#86868B] uppercase tracking-wider">Progresso</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-1.5 bg-[#38383A] rounded-full overflow-hidden">
                                                            <div className="h-full bg-[#30D158] w-[0%]" />
                                                            {/* Placeholder progress */}
                                                        </div>
                                                        <span className="text-[13px] text-[#F5F5F7] font-medium">0%</span>
                                                    </div>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center group-hover:bg-[#0071E3] group-hover:text-white transition-all">
                                                    <PlayCircle className="w-5 h-5 ml-0.5" strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Catalog Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold text-[#F5F5F7]">Catálogo Disponível</h2>
                            <span className="bg-[#1C1C1E] text-[#86868B] text-xs font-medium px-2.5 py-1 rounded-full border border-[#38383A]">
                                {otherCourses.length}
                            </span>
                        </div>

                        {otherCourses.length === 0 ? (
                            <div className="py-12 text-center text-[#86868B] bg-[#1C1C1E]/50 rounded-[24px] border border-dashed border-[#38383A]">
                                {myCourses.length > 0 ? "Você já está matriculado em todos os cursos!" : "Nenhum curso disponível no momento."}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherCourses.map(course => (
                                    <div key={course.id} className="group relative bg-[#1C1C1E]/50 rounded-[24px] p-6 border border-[#38383A] hover:border-[#0071E3]/50 transition-all duration-300">
                                        <div className="absolute top-4 right-4 text-[#FF9F0A] bg-[#FF9F0A]/10 px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5">
                                            <Lock className="w-3 h-3" strokeWidth={1.5} />
                                            Bloqueado
                                        </div>

                                        <div className="mb-6 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <div className="w-14 h-14 rounded-[18px] bg-[#2C2C2E] flex items-center justify-center">
                                                <BookOpen className="w-7 h-7 text-[#86868B] group-hover:text-[#0071E3] transition-colors" strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <h3 className="text-[18px] font-semibold text-[#F5F5F7] group-hover:text-white transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-[14px] text-[#86868B] line-clamp-2">
                                                {course.description || "Explore este conteúdo exclusivo."}
                                            </p>
                                        </div>

                                        <div className="pt-5 border-t border-[#38383A] flex items-center justify-between">
                                            <div className="text-[#F5F5F7] font-semibold">
                                                {course.price ? `R$ ${course.price.toFixed(2).replace('.', ',')}` : 'Grátis'}
                                            </div>
                                            <button
                                                disabled
                                                className="text-[13px] font-medium text-[#86868B] flex items-center gap-1 opacity-70 cursor-not-allowed"
                                            >
                                                Ver Detalhes
                                                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                </div>
            )}
        </div>
    );
}
