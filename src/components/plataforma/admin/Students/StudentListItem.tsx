"use client";

import { Mail, BookOpen, MoreVertical } from "lucide-react";

interface StudentListItemProps {
    student: any;
    onOpenEnrollModal: (student: any) => void;
}

export function StudentListItem({ student, onOpenEnrollModal }: StudentListItemProps) {
    return (
        <div className="p-5 flex items-center justify-between hover:bg-[#2C2C2E] transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                    {student.name ? student.name[0].toUpperCase() : (student.email ? student.email[0].toUpperCase() : "?")}
                </div>
                <div>
                    <div className="text-[#F5F5F7] font-medium text-[15px]">{student.name || "Sem Nome"}</div>
                    <div className="text-[#86868B] text-[13px] flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {student.email}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex flex-col items-end">
                    <span className="text-[#86868B] text-[12px] uppercase font-medium tracking-wide">Cursos</span>
                    <div className="flex items-center gap-1 text-[#F5F5F7] font-medium mt-0.5">
                        <BookOpen className="w-4 h-4 text-[#0071E3]" />
                        <span>{student.enrollmentsCount}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button
                        onClick={() => onOpenEnrollModal(student)}
                        className="bg-[#38383A] hover:bg-[#48484A] text-[#F5F5F7] px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors border border-[#48484A]"
                    >
                        Gerenciar
                    </button>
                    {/* <div className="p-2 text-[#86868B] hover:text-[#F5F5F7] cursor-pointer">
                        <MoreVertical className="w-5 h-5" />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
