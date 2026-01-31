'use client';

import React, { useState, useRef } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { Download, Upload, FileDown, ChevronRight, ChevronLeft, CheckCircle2, RotateCcw, Rocket, ArrowLeft, BrainCircuit, Sparkles, Target, MessageCircleMore, ShieldCheck } from 'lucide-react';
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
    { title: "Boost AI", description: "Acelere sua Carreira" },
];

export function ResumeGenerator() {
    const [data, setData] = useState<ResumeData>(initialData);
    const [currentStep, setCurrentStep] = useState(0);
    const [lgpdConsent, setLgpdConsent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const [showCpfModal, setShowCpfModal] = useState(false);
    const [cpf, setCpf] = useState('');
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

    const handleSubscribeClick = () => {
        setShowCpfModal(true);
    };

    const handleConfirmSubscribe = async () => {
        const cleanCpf = cpf.replace(/\D/g, '');
        if (cleanCpf.length < 11) {
            alert('Por favor, informe um CPF válido.');
            return;
        }

        setIsLoading(true);
        try {
            const enrichedData = {
                ...data,
                personal: {
                    ...data.personal,
                    cpf: cleanCpf
                }
            };

            const response = await fetch('/api/boost/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    personal: enrichedData.personal,
                    resumeData: data
                })
            });
            const result = await response.json();

            if (result.success && result.paymentUrl) {
                window.location.href = result.paymentUrl;
            } else if (result.success) {
                alert('Assinatura criada com sucesso! Verifique seu email para o pagamento.');
            } else {
                alert('Erro ao processar assinatura: ' + (result.error || 'Erro desconhecido') + (result.details ? ` (${result.details})` : ''));
            }

        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao processar sua solicitação.');
        } finally {
            setIsLoading(false);
            setShowCpfModal(false);
        }
    };

    const handleBoostClick = async () => {
        setIsSubmittingLead(true);
        try {
            const response = await fetch('/api/boost/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    personal: data.personal,
                    resumeData: data
                })
            });
            const result = await response.json();

            if (result.success) {
                setCurrentStep(6);
            } else {
                // Even if it fails to save, maybe letting them proceed is better? 
                // Or alert? Let's alert for now.
                console.error("Failed to capture lead", result.error);
                setCurrentStep(6); // Navigate anyway to not block the user
            }
        } catch (error) {
            console.error("Error submitting lead", error);
            setCurrentStep(6); // Navigate anyway
        } finally {
            setIsSubmittingLead(false);
        }
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

    const isPreviewStep = currentStep === 5;
    const isBoostStep = currentStep === 6;
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
                                    onClick={() => !isPreviewStep && !isBoostStep && setCurrentStep(index)}
                                    disabled={isPreviewStep || isBoostStep}
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
                    <div className={`relative bg-[#0E0E0E]/50 backdrop-blur-xl rounded-2xl border border-white/5 p-1 md:p-8 md:pt-4 ${isBoostStep ? 'border-emerald-500/20 shadow-[0_0_50px_-20px_rgba(16,185,129,0.2)]' : ''}`}>

                        {/* Form Header (Desktop) */}
                        {!isPreviewStep && !isBoostStep && (
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

                        {isBoostStep && (
                            <div className="animate-in fade-in zoom-in-95 duration-500 py-8 px-4 md:px-12">
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 mb-6 relative">
                                        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
                                        <Rocket className="w-12 h-12 text-purple-400 relative z-10" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                        Acelere sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Contratação</span>
                                    </h2>
                                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                        Use nossa IA para encontrar as vagas perfeitas para seu perfil e saia na frente da concorrência.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                                    <div className="space-y-8">
                                        <div className="flex gap-4 items-start">
                                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1">
                                                <BrainCircuit size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Análise de Perfil com IA</h3>
                                                <p className="text-slate-400 leading-relaxed">Nossa tecnologia analisa seu currículo e portfólio para entender profundamente suas habilidades.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-1">
                                                <Target size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Match de Vagas Preciso</h3>
                                                <p className="text-slate-400 leading-relaxed">Receba alertas apenas de vagas que realmente fazem sentido para seu momento de carreira.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-1">
                                                <Sparkles size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Destaque-se no Mercado</h3>
                                                <p className="text-slate-400 leading-relaxed">Saiba exatamente quais skills desenvolver para alcançar as melhores oportunidades.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-b from-[#151515] to-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                                        <div className="absolute top-0 right-0 p-3 bg-purple-500 text-white text-xs font-bold uppercase tracking-widest rounded-bl-2xl">
                                            Melhor Escolha
                                        </div>

                                        <div className="mb-6">
                                            <span className="text-slate-400 text-sm uppercase tracking-wider font-bold">Plano Anual</span>
                                            <div className="flex items-end gap-2 mt-2">
                                                <span className="text-5xl font-black text-white">R$ 59,90</span>
                                                <span className="text-slate-500 font-medium mb-1">/ano</span>
                                            </div>
                                            <p className="text-emerald-400 text-sm font-bold mt-2 bg-emerald-500/10 inline-block px-3 py-1 rounded-full border border-emerald-500/20">
                                                Menos de R$ 5,00 por mês
                                            </p>
                                        </div>

                                        <p className="text-slate-300 mb-8 pb-8 border-b border-white/5">
                                            O investimento se paga tranquilamente com a <span className="text-white font-bold">primeira vaga conquistada</span>. Não perca tempo procurando, deixe as vagas virem até você.
                                        </p>

                                        <div className="space-y-4 mb-8">
                                            <label className="flex items-start gap-3 cursor-pointer group/check">
                                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${lgpdConsent ? 'bg-purple-500 border-purple-500' : 'border-slate-600 bg-transparent'}`}>
                                                    {lgpdConsent && <span className="block w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={lgpdConsent}
                                                    onChange={(e) => setLgpdConsent(e.target.checked)}
                                                />
                                                <span className="text-xs text-slate-400 leading-relaxed group-hover/check:text-slate-300 transition-colors">
                                                    Concordo que o Hoffby analise os dados do meu currículo para fins de recomendação de vagas e aprimoramento da IA, conforme a LGPD.
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            disabled={!lgpdConsent || isLoading}
                                            onClick={handleSubscribeClick}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    Processando...
                                                </>
                                            ) : (
                                                "Quero Assinar Agora"
                                            )}
                                        </button>

                                        <div className="mt-6 text-center">
                                            <button className="text-slate-500 hover:text-white text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors">
                                                <MessageCircleMore size={16} />
                                                Falar com especialista
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isPreviewStep ? (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                <div className="flex flex-wrap gap-4 justify-center bg-[#0E0E0E] p-4 rounded-xl border border-white/5 mb-8">
                                    <button
                                        onClick={handleBoostClick}
                                        disabled={isSubmittingLead}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.7)] transform hover:-translate-y-1 w-full md:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmittingLead ? (
                                            <>
                                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Processando...
                                            </>
                                        ) : (
                                            <>
                                                <Rocket size={18} className="animate-pulse" />
                                                Receber alerta de vagas com IA
                                            </>
                                        )}
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
                        ) : !isBoostStep ? (
                            <ResumeForm data={data} onChange={setData} step={currentStep} />
                        ) : null}

                        {/* Navigation Footer (Integrated & Sticky) */}
                        {!isPreviewStep && !isBoostStep && (
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

                        {/* CPF Modal */}
                        {showCpfModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                                <div className="bg-[#121212] border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
                                    <h3 className="text-xl font-bold text-white text-center">Informe seu CPF</h3>
                                    <p className="text-slate-400 text-sm text-center">
                                        Para emitir a cobrança via PIX/Boleto, o banco exige o CPF do pagador.
                                    </p>

                                    <div className="space-y-2">
                                        <input
                                            type="text" // using simple text for now, assume user types numbers
                                            value={cpf}
                                            onChange={(e) => {
                                                // Simple mask logic or just value
                                                const v = e.target.value.replace(/\D/g, '');
                                                if (v.length <= 11) setCpf(v);
                                            }}
                                            placeholder="000.000.000-00"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors text-center text-lg tracking-widest"
                                        />
                                        <p className="text-xs text-slate-500 text-center">Somente números</p>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setShowCpfModal(false)}
                                            className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors font-medium"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleConfirmSubscribe}
                                            disabled={cpf.length < 11 || isLoading}
                                            className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Processando...' : 'Confirmar'}
                                        </button>
                                    </div>
                                </div>
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
