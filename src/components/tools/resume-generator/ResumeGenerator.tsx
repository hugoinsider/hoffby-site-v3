'use client';

import React, { useState, useRef } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { Download, Upload, FileDown, ChevronRight, ChevronLeft, CheckCircle2, RotateCcw, Rocket, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export type ResumeData = {
    personal: {
        fullName: string;
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        portfolio: string;
        summary: string;
        location: string;
        role: string;
    };
    experience: {
        id: string;
        company: string;
        role: string;
        startDate: string;
        endDate: string;
        current: boolean;
        description: string;
        workMode?: 'Presencial' | 'Remoto' | 'Híbrido';
    }[];
    education: {
        id: string;
        institution: string;
        degree: string;
        field: string;
        startDate: string;
        endDate: string;
    }[];
    skills: string[];
    projects: {
        id: string;
        name: string;
        description: string;
        technologies: string[];
        link: string;
    }[];
    languages: {
        id: string;
        language: string;
        level: string;
    }[];
};

const initialData: ResumeData = {
    personal: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary: "",
        location: "",
        role: "Software Developer"
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: []
};

const STEPS = [
    { title: "Pessoal", description: "Identificação" },
    { title: "Experiência", description: "Histórico Profissional" },
    { title: "Formação", description: "Acadêmico" },
    { title: "Projetos", description: "Portfólio" },
    { title: "Habilidades", description: "Tecnologias" },
    { title: "Revisão", description: "Preview e Exportar" },
];

export function ResumeGenerator() {
    const [data, setData] = useState<ResumeData>(initialData);
    const [currentStep, setCurrentStep] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const printRef = useRef<HTMLDivElement>(null);

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target?.result as string);
                    setData(importedData);
                } catch (error) {
                    console.error("Error parsing JSON", error);
                    alert("Erro ao importar JSON. Verifique o formato do arquivo.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'resume.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handlePrint = () => {
        setTimeout(() => {
            window.print();
        }, 100);
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(s => s + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isPreviewStep = currentStep === STEPS.length - 1;
    const currentStepData = STEPS[currentStep];

    return (
        <div className="max-w-[1600px] mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <Link href="/ferramentas" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-medium">
                    <ArrowLeft size={16} /> Voltar para Ferramentas
                </Link>
            </div>

            <header className="mb-12 text-center max-w-2xl mx-auto flex flex-col items-center">
                <div className="mb-8 scale-150 p-4 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                    <Logo className="w-24 h-24 relative z-10" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Beta Tool
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight">
                    Gerador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Currículo Tech</span>
                </h1>
                <p className="text-slate-400 text-lg">
                    Focado em desenvolvedores de software, mas adaptável para profissionais de todas as áreas que buscam um design moderno e minimalista.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

                {/* Desktop Stepper (Sidebar) */}
                <div className="hidden lg:block w-72 sticky top-8">
                    <div className="space-y-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/5" />

                        {STEPS.map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <button
                                    key={index}
                                    onClick={() => !isPreviewStep && setCurrentStep(index)}
                                    disabled={isPreviewStep}
                                    className={`relative flex items-center gap-4 w-full p-4 rounded-xl border transition-all duration-300 text-left group ${isActive
                                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]'
                                        : 'bg-[#0E0E0E] border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                        ? 'bg-[#050505] border-emerald-500 text-emerald-500 scale-110'
                                        : isCompleted
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'bg-[#050505] border-white/10 text-slate-600 group-hover:border-white/30'
                                        }`}>
                                        {isCompleted ? <CheckCircle2 size={18} /> : <span className="text-sm font-bold">{index + 1}</span>}
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'
                                            }`}>
                                            Passo {index + 1}
                                        </div>
                                        <div className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                                            }`}>
                                            {step.title}
                                        </div>
                                    </div>

                                    {isActive && (
                                        <div className="absolute right-4 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Stepper (Compact) */}
                <div className="lg:hidden w-full bg-[#0E0E0E] rounded-xl p-4 border border-white/10 flex items-center justify-between mb-4">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="text-center">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                            Passo {currentStep + 1} de {STEPS.length}
                        </span>
                        <span className="font-bold text-white">{currentStepData.title}</span>
                    </div>
                    <button
                        onClick={nextStep}
                        disabled={currentStep === STEPS.length - 1}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 w-full max-w-5xl transition-all duration-500">

                    {/* Glass Container */}
                    <div className="relative bg-[#0E0E0E]/50 backdrop-blur-xl rounded-2xl border border-white/5 p-1 md:p-8 md:pt-4">

                        {/* Form Header (Desktop) */}
                        {!isPreviewStep && (
                            <div className="hidden lg:flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h2>
                                    <p className="text-slate-400">{currentStepData.description}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                                    <span className="text-emerald-400 font-bold">{currentStep + 1}</span>
                                </div>
                            </div>
                        )}

                        {isPreviewStep ? (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                <div className="flex flex-wrap gap-4 justify-center bg-[#0E0E0E] p-4 rounded-xl border border-white/5 mb-8">
                                    <button
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.7)] transform hover:-translate-y-1 w-full md:w-auto justify-center"
                                    >
                                        <Rocket size={18} className="animate-pulse" />
                                        Ativar Alerta de Vagas (Boost)
                                    </button>

                                    <div className="w-full md:hidden h-px bg-white/10 my-2" />

                                    <button
                                        onClick={handlePrint}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] flex-1 justify-center"
                                    >
                                        <Download size={18} /> Baixar PDF
                                    </button>
                                    <button
                                        onClick={handleExportJSON}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold transition-colors border border-white/10 hover:border-white/20"
                                    >
                                        <FileDown size={18} /> Exportar JSON
                                    </button>
                                    <button
                                        onClick={() => setData(initialData)}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition-colors border border-red-500/20 hover:border-red-500/30 ml-auto"
                                    >
                                        <RotateCcw size={18} /> Resetar
                                    </button>
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                                    <ResumePreview data={data} ref={printRef} />
                                </div>
                            </div>
                        ) : (
                            <ResumeForm data={data} onChange={setData} step={currentStep} />
                        )}

                        {/* Navigation Footer (Integrated & Sticky) */}
                        {!isPreviewStep && (
                            <div className="sticky bottom-0 z-20 mt-8 -mx-1 md:-mx-8 -mb-1 md:-mb-8 p-4 md:p-8 bg-[#0E0E0E]/80 backdrop-blur-xl border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 rounded-b-2xl">

                                {currentStep === 0 ? (
                                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20 cursor-pointer text-sm font-bold uppercase tracking-wider">
                                        <Upload size={16} /> Importar JSON
                                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                                    </label>
                                ) : (
                                    <button
                                        onClick={prevStep}
                                        className="text-slate-400 hover:text-white font-bold transition-colors flex items-center gap-2 px-4 py-2"
                                    >
                                        <ChevronLeft size={18} /> Voltar
                                    </button>
                                )}

                                <button
                                    onClick={nextStep}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] group"
                                >
                                    Próximo Passo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden spacer for visual balance */}
            <div className="h-24"></div>
        </div>
    );
}
