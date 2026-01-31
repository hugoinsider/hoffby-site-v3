'use client';

import React, { useState, useRef } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { JsonDocsModal } from './JsonDocsModal';
import { Trash2, Plus, Download, ChevronRight, ChevronLeft, Save, Sparkles, Check, AlertCircle, Copy, Share2, Printer, FileText, Send, Lock, Eye, EyeOff, CheckCircle, Upload, FileDown, Rocket, ArrowLeft, BrainCircuit, Target, MessageCircleMore, RotateCcw, CheckCircle2, FileJson, X } from 'lucide-react';
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

const EXAMPLE_RESUME_DATA: ResumeData = {
    personal: {
        fullName: "Dev Exemplo da Silva",
        role: "Senior Full Stack Engineer",
        email: "dev.teste@exemplo.com",
        phone: "(11) 99999-9999",
        location: "São Paulo, SP",
        linkedin: "linkedin.com/in/devexemplo",
        github: "github.com/devexemplo",
        portfolio: "devexemplo.com",
        summary: "Engenheiro de Software apaixonado por criar soluções escaláveis e de alto impacto. Com mais de 6 anos de experiência em desenvolvimento web, especializei-me em React, Node.js e arquitetura de microsserviços. Liderou equipes técnicas e entregou projetos complexos para fintechs e startups.",
    },
    experience: [
        {
            id: '1',
            company: "TechFin Innovation",
            role: "Tech Lead",
            startDate: "2023-01",
            endDate: "",
            current: true,
            workMode: "Remoto",
            description: "Lidero uma equipe de 8 desenvolvedores na construção da plataforma de pagamentos next-gen. Implementei arquitetura baseada em eventos que reduziu a latência em 40%. Responsável por code reviews, decisões arquiteturais e mentoria técnica."
        },
        {
            id: '2',
            company: "StartUp Veloz",
            role: "Senior Frontend Developer",
            startDate: "2020-06",
            endDate: "2022-12",
            current: false,
            workMode: "Híbrido",
            description: "Desenvolvi o dashboard principal utilizando React e Next.js. Otimizei a performance da aplicação melhorando o Core Web Vitals (LCP de 2.5s para 0.8s). Colaborei diretamente com o time de UX para implementar um design system robusto."
        }
    ],
    education: [
        {
            id: '1',
            institution: "Universidade de Tecnologia (USP)",
            degree: "Bacharelado",
            field: "Ciência da Computação",
            startDate: "2016",
            endDate: "2020"
        }
    ],
    skills: [
        "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
        "AWS (Lambda, S3)", "Docker", "CI/CD", "System Design", "Tailwind CSS"
    ],
    projects: [
        {
            id: '1',
            name: "E-commerce Headless",
            description: "Plataforma de e-commerce open-source construída com Next.js e Stripe. Mais de 1k estrelas no GitHub.",
            technologies: ["Next.js", "Stripe", "Zustand"],
            link: "https://github.com/exemplo/ecommerce"
        }
    ],
    languages: [
        { id: '1', language: "Português", level: "Nativo" },
        { id: '2', language: "Inglês", level: "Avançado" }
    ]
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
    const [showJsonDocs, setShowJsonDocs] = useState(false);
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

                    // Sanitize and merge with initial structure to prevent undefined errors
                    const safeData: ResumeData = {
                        ...initialData,
                        ...importedData,
                        personal: { ...initialData.personal, ...importedData.personal },
                        experience: Array.isArray(importedData.experience) ? importedData.experience : [],
                        education: Array.isArray(importedData.education) ? importedData.education : [],
                        skills: Array.isArray(importedData.skills) ? importedData.skills : [],
                        projects: Array.isArray(importedData.projects) ? importedData.projects : [],
                        languages: Array.isArray(importedData.languages) ? importedData.languages : [],
                    };

                    setData(safeData);
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



    const handleGenerateExample = () => {
        if (confirm("Isso irá substituir os dados atuais por um exemplo. Deseja continuar?")) {
            setData(EXAMPLE_RESUME_DATA);
        }
    };

    const handleDownloadTemplate = () => {
        // Export fully populated example data as the template to help users understand the structure
        const templateData = EXAMPLE_RESUME_DATA;
        const dataStr = JSON.stringify(templateData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'modelo-preenchido-hoffby.json');
        linkElement.click();
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
                <Logo className="w-24 h-24 relative z-10" />
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
                    <div className="space-y-0 relative">
                        {/* Connecting Line - Behind the items */}
                        <div className="absolute left-10 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent" />

                        {STEPS.map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <div
                                    key={index}
                                    className={`group relative flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-300 cursor-pointer ${isActive
                                        ? 'bg-gradient-to-r from-emerald-500/10 to-transparent'
                                        : 'hover:bg-white/5'
                                        }`}
                                    onClick={() => isCompleted && setCurrentStep(index)}
                                >
                                    {/* Indicator Circle */}
                                    <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xl ${isActive
                                        ? 'bg-[#0E0E0E] border-emerald-500 text-emerald-500 scale-110 shadow-emerald-500/20'
                                        : isCompleted
                                            ? 'bg-emerald-500 border-emerald-500 text-white cursor-pointer hover:bg-emerald-600'
                                            : 'bg-[#0E0E0E] border-white/10 text-slate-600'
                                        }`}>
                                        {isCompleted ? <CheckCircle2 size={20} /> : <span className="text-sm font-black">{index + 1}</span>}

                                        {isActive && (
                                            <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-ping" />
                                        )}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1">
                                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-600'
                                            }`}>
                                            Passo {index + 1}
                                        </div>
                                        <div className={`font-bold transition-colors ${isActive ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                                            }`}>
                                            {step.title}
                                        </div>
                                    </div>

                                    {/* Arrow indicator for active */}
                                    {isActive && (
                                        <ChevronRight size={16} className="text-emerald-500 animate-in slide-in-from-left-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Stepper (Compact - Status Only) */}
                <div className="lg:hidden w-full bg-[#0E0E0E] rounded-xl p-4 border border-white/10 flex items-center justify-center mb-4">
                    <div className="text-center">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                            Passo {currentStep + 1} de {STEPS.length}
                        </span>
                        <span className="font-bold text-white">{currentStepData.title}</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 w-full max-w-5xl transition-all duration-500">

                    {/* Glass Container */}
                    <div className={`relative bg-[#0E0E0E]/80 backdrop-blur-md rounded-xl border border-white/10 p-1 md:p-8 md:pt-4 ${isBoostStep ? 'border-orange-500/20 shadow-[0_0_50px_-20px_rgba(249,115,22,0.2)]' : ''}`}>

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
                                    <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 mb-6 relative">
                                        <div className="absolute inset-0 rounded-xl bg-orange-500/20 blur-xl animate-pulse" />
                                        <Rocket className="w-12 h-12 text-orange-400 relative z-10" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                        Acelere sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Contratação</span>
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
                                <div id='resume-actions' className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0E0E0E] p-6 rounded-2xl border border-white/5 mb-8 shadow-2xl">

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <button
                                            onClick={() => setData(initialData)}
                                            className="px-4 py-2 rounded-lg text-slate-500 hover:text-red-400 font-bold transition-colors text-xs uppercase tracking-wider hover:bg-red-500/5"
                                        >
                                            <div className="flex items-center gap-2">
                                                <RotateCcw size={14} /> Resetar Tudo
                                            </div>
                                        </button>
                                        <button
                                            onClick={handleExportJSON}
                                            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white font-bold transition-colors text-xs uppercase tracking-wider hover:bg-white/5 border border-transparent hover:border-white/10"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileDown size={14} /> Salvar JSON
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                        <button
                                            onClick={handleBoostClick}
                                            disabled={isSubmittingLead}
                                            className="group relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 hover:from-purple-600 hover:to-indigo-600 text-white font-bold transition-all border border-purple-500/30 hover:border-purple-400/50 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                            {isSubmittingLead ? (
                                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <div className="p-1 bg-purple-500/20 rounded-lg group-hover:bg-white/20 transition-colors">
                                                        <Rocket size={18} className="text-purple-300 group-hover:text-white" />
                                                    </div>
                                                    <span>Aplicar com I.A.</span>
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => window.print()}
                                            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white font-bold transition-all shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)]"
                                        >
                                            <div className="p-1 bg-black/10 rounded-lg group-hover:bg-transparent transition-colors">
                                                <Download size={20} />
                                            </div>
                                            <span className="text-lg">Baixar PDF</span>
                                        </button>
                                    </div>
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
                                    <div className="flex gap-2">
                                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20 cursor-pointer text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                                            <Upload size={16} /> Importar
                                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                                        </label>

                                        <div className="hidden md:flex gap-2">
                                            <button
                                                onClick={handleGenerateExample}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-colors border border-white/10 text-xs font-bold uppercase tracking-wider"
                                                title="Gerar currículo de exemplo"
                                            >
                                                <Sparkles size={14} /> Exemplo
                                            </button>
                                            <button
                                                onClick={handleDownloadTemplate}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-colors border border-white/10 text-xs font-bold uppercase tracking-wider"
                                                title="Baixar modelo preenchido (Exemplo Completo)"
                                            >
                                                <FileDown size={14} /> Modelo Rico
                                            </button>
                                            <button
                                                onClick={() => setShowJsonDocs(true)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 text-xs font-bold uppercase tracking-wider"
                                                title="Ver documentação do JSON"
                                            >
                                                <FileJson size={14} /> Docs
                                            </button>
                                        </div>
                                    </div>
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
                                <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
                                    <button
                                        onClick={() => setShowCpfModal(false)}
                                        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                                            <Lock className="text-orange-500" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Segurança em Primeiro Lugar</h3>
                                        <p className="text-slate-400 text-sm">
                                            Para gerar seu boleto/PIX com segurança, precisamos validar seu CPF junto ao gateway de pagamento (Asaas).
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CPF do Titular</label>
                                            <input
                                                type="text" // using simple text for now, assume user types numbers
                                                value={cpf}
                                                onChange={(e) => {
                                                    // Simple mask logic or just limitation
                                                    const v = e.target.value.replace(/\D/g, '');
                                                    if (v.length <= 11) setCpf(v);
                                                }}
                                                placeholder="000.000.000-00"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors text-center text-lg tracking-widest"
                                            />
                                        </div>

                                        <button
                                            onClick={handleConfirmSubscribe}
                                            disabled={cpf.length < 11 || isSubmittingLead}
                                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                                        >
                                            {isSubmittingLead ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Processando...
                                                </>
                                            ) : (
                                                <>
                                                    Gerar Pagamento <ChevronRight size={20} />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-[10px] text-slate-600">
                                            Seus dados são criptografados e enviados diretamente para o processador de pagamentos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden spacer for visual balance */}
            <div className="h-24"></div>

            <JsonDocsModal isOpen={showJsonDocs} onClose={() => setShowJsonDocs(false)} />
        </div>
    );
}
