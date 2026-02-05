"use client";

import { CheckCircle, PlayCircle, Lock, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function LessonList({ modules, currentLessonId, onSelectLesson }: any) {
    const [expandedModules, setExpandedModules] = useState<string[]>(modules?.map((m: any) => m.id) || []);

    const toggleModule = (id: string) => {
        if (expandedModules.includes(id)) {
            setExpandedModules(expandedModules.filter(m => m !== id));
        } else {
            setExpandedModules([...expandedModules, id]);
        }
    };

    return (
        <div className="space-y-4">
            {modules?.map((module: any) => {
                const isExpanded = expandedModules.includes(module.id);
                const hasActiveLesson = module.lessons?.some((l: any) => l.id === currentLessonId);

                return (
                    <div key={module.id} className="space-y-2">
                        <button
                            onClick={() => toggleModule(module.id)}
                            className={clsx(
                                "w-full flex items-center justify-between text-left text-sm font-medium transition-colors",
                                hasActiveLesson ? "text-indigo-400" : "text-slate-300 hover:text-white"
                            )}
                        >
                            <span>{module.title}</span>
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                            <div className="space-y-1 pl-2">
                                {module.lessons?.map((lesson: any) => {
                                    const isActive = lesson.id === currentLessonId;
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => onSelectLesson(lesson)}
                                            className={clsx(
                                                "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm group text-left",
                                                isActive
                                                    ? "bg-indigo-600/10 text-indigo-300 border border-indigo-500/20"
                                                    : "hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent"
                                            )}
                                        >
                                            {/* Status Icon */}
                                            <div className={clsx("min-w-[1.25rem]", isActive ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-500")}>
                                                {isActive ? <PlayCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                            </div>

                                            <span className="truncate">{lesson.title}</span>

                                            {!lesson.is_free && !isActive && (
                                                <Lock className="w-3 h-3 ml-auto text-slate-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
