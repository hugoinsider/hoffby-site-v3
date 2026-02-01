'use client';

import React, { useMemo } from 'react';
import { ResumeData } from './ResumeGenerator';
import { CheckCircle2, AlertTriangle, XCircle, Info, ChevronDown, ChevronUp, BrainCircuit, Activity, FileText, Search, Fingerprint } from 'lucide-react';

interface ResumeAnalyzerProps {
    data: ResumeData;
    className?: string;
}

// Helper to count words
const countWords = (str: string) => {
    return str.trim().split(/\s+/).filter(w => w.length > 0).length;
};

// Helper to calculate score
const calculateScore = (checks: { passed: boolean; weight: number }[]) => {
    const totalWeight = checks.reduce((acc, c) => acc + c.weight, 0);
    const passedWeight = checks.reduce((acc, c) => acc + (c.passed ? c.weight : 0), 0);
    return Math.round((passedWeight / totalWeight) * 100);
};

export function ResumeAnalyzer({ data, className = "" }: ResumeAnalyzerProps) {
    // --- Analysis Logic ---
    const analysis = useMemo(() => {
        const checks = [];

        // 1. Synopsis (Structure & Length)
        const summaryWords = countWords(data.personal.summary || "");
        const experienceWords = data.experience.reduce((acc, exp) => acc + countWords(exp.description || ""), 0);
        const totalWords = summaryWords + experienceWords + countWords(data.personal.role || "") + data.skills.length; // Approximate

        // Heuristic for pages: ~400 words per page? 
        const estimatedPages = Math.ceil(totalWords / 400) || 1;

        const synopsis = {
            wordCount: {
                value: totalWords,
                status: totalWords >= 300 && totalWords <= 1200 ? 'success' : 'warning',
                msg: totalWords < 300 ? "Pouco conteúdo (min: 300)" : totalWords > 1200 ? "Muito conteúdo (max: 1200)" : "Tamanho ideal"
            },
            pageCount: {
                value: estimatedPages,
                status: estimatedPages <= 2 ? 'success' : 'warning',
                msg: estimatedPages > 2 ? "Mais de 2 páginas estimadas" : "Dentro do limite (1-2 pág)"
            },
            sections: {
                hasExperience: data.experience.length > 0,
                hasEducation: data.education.length > 0,
                hasSkills: data.skills.length > 0,
                hasProjects: data.projects.length > 0,
            }
        };

        // 2. Identification
        const id = {
            hasPhone: !!data.personal.phone,
            hasEmail: !!data.personal.email,
            hasLinkedin: !!data.personal.linkedin,
            hasLocation: !!data.personal.location,
        };

        // 3. Lexical (Pronouns, Formatting)
        const allText = (data.personal.summary + " " + data.experience.map(e => e.description).join(" ")).toLowerCase();

        // Check for personal pronouns (Eu, mim, meu)
        const pronounRegex = /\b(eu|mim|meu|minha|meus|minhas)\b/gi;
        const pronounsFound = (allText.match(pronounRegex) || []).length;

        // Check for numbers written as words (um, dois, três... dez)
        const numWordsRegex = /\b(um|dois|três|quatro|cinco|seis|sete|oito|nove|dez)\b/gi;
        const numWordsFound = (allText.match(numWordsRegex) || []).length;

        // Avg word length (simple vocabulary proxy)
        const words = allText.split(/\s+/).filter(w => w.length > 0);
        const avgWordLen = words.length > 0 ? words.reduce((a, b) => a + b.length, 0) / words.length : 0;
        const vocabLevel = avgWordLen > 5 ? 'Alto' : avgWordLen > 4 ? 'Médio' : 'Baixo';

        // 4. Semantic (Measurable, Skills)
        const measureTerms = ['%', 'R$', '$', 'aumentou', 'reduziu', 'gerou', 'melhorou', 'otimizou', 'liderou', 'crescimento'];
        // Simple check: does any experience description contain specific measurable patterns?
        // Look for digits followed by % or preceded by currency
        const measurableRegex = /(\d+%|R\$\s*\d|\$\d|aument(ou|ei)|reduz(iu|i))/i;
        const measurableCount = data.experience.filter(e => measurableRegex.test(e.description)).length;

        const hardSkillsCount = data.skills.length;
        // Basic check for soft skills keywords? (Hard to distinguish without a list)
        // Let's rely on hard skills count > 5 for "Good Technical Density"
        const efficiencyRatio = hardSkillsCount / (1 + (data.personal.summary.length / 100)); // Arbitrary logical check

        checks.push(
            { weight: 10, passed: synopsis.wordCount.status === 'success' },
            { weight: 10, passed: synopsis.pageCount.status === 'success' },
            { weight: 5, passed: synopsis.sections.hasExperience },
            { weight: 5, passed: synopsis.sections.hasEducation },
            { weight: 5, passed: synopsis.sections.hasSkills },
            { weight: 10, passed: id.hasEmail && id.hasPhone },
            { weight: 5, passed: id.hasLinkedin },
            { weight: 10, passed: pronounsFound === 0 },
            { weight: 5, passed: numWordsFound === 0 },
            { weight: 10, passed: measurableCount >= 1 } // At least one measurable achievement
        );

        const score = calculateScore(checks);

        return {
            synopsis,
            id,
            lexical: { pronounsFound, numWordsFound, vocabLevel },
            semantic: { measurableCount, hardSkillsCount },
            score
        };
    }, [data]);

    return (
        <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}>

            {/* Header / Score */}
            <div className="bg-[#0E0E0E] rounded-2xl p-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="space-y-4 relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
                        <BrainCircuit size={14} /> Análise ATS
                    </div>
                    <h2 className="text-3xl font-bold text-white">Pontuação do Currículo</h2>
                    <p className="text-slate-400 max-w-lg">
                        Analisamos seu currículo com base nos principais critérios de sistemas de rastreamento (ATS) e recrutadores.
                    </p>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Circular Progress (Simple SVG) */}
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#1e293b"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={analysis.score > 80 ? "#10b981" : analysis.score > 50 ? "#f59e0b" : "#ef4444"}
                                strokeWidth="3"
                                strokeDasharray={`${analysis.score}, 100`}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-white">{analysis.score}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-500">de 100</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Synopsis */}
                <Card
                    title="Sinopse do Documento"
                    icon={<FileText className="text-blue-400" size={20} />}
                    scoreColor="blue"
                >
                    <CheckItem
                        passed={analysis.synopsis.wordCount.status === 'success'}
                        label="Contagem de Palavras"
                        value={`${analysis.synopsis.wordCount.value}`}
                        sub={analysis.synopsis.wordCount.msg}
                    />
                    <CheckItem
                        passed={analysis.synopsis.pageCount.status === 'success'}
                        label="Páginas Estimadas"
                        value={`~${analysis.synopsis.pageCount.value}`}
                        sub={analysis.synopsis.pageCount.msg}
                    />
                    <div className="pt-2 border-t border-white/5 space-y-2">
                        <LabelStatus passed={analysis.synopsis.sections.hasExperience} label="Seção de Experiência" />
                        <LabelStatus passed={analysis.synopsis.sections.hasEducation} label="Seção de Educação" />
                        <LabelStatus passed={analysis.synopsis.sections.hasSkills} label="Seção de Habilidades" />
                        <LabelStatus passed={analysis.synopsis.sections.hasProjects} label="Seção de Projetos" />
                    </div>
                </Card>

                {/* 2. Identification */}
                <Card
                    title="Identificação de Dados"
                    icon={<Fingerprint className="text-emerald-400" size={20} />}
                    scoreColor="emerald"
                >
                    <LabelStatus passed={analysis.id.hasEmail} label="Email Profissional" />
                    <LabelStatus passed={analysis.id.hasPhone} label="Telefone de Contato" />
                    <LabelStatus passed={analysis.id.hasLinkedin} label="Link do LinkedIn" />
                    <LabelStatus passed={analysis.id.hasLocation} label="Localização" />
                    <div className="mt-4 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-xs text-slate-400">
                        <Info size={14} className="inline mr-1 text-emerald-500" />
                        Certifique-se de que seus links estão clicáveis e corretos.
                    </div>
                </Card>

                {/* 3. Lexical */}
                <Card
                    title="Análise Lexical"
                    icon={<Search className="text-purple-400" size={20} />}
                    scoreColor="purple"
                >
                    <CheckItem
                        passed={analysis.lexical.pronounsFound === 0}
                        label="Pronomes Pessoais (Eu/Mim)"
                        value={analysis.lexical.pronounsFound.toString()}
                        sub={analysis.lexical.pronounsFound > 0 ? "Evite usar 1ª pessoa" : "Ótimo, texto impessoal"}
                    />
                    <CheckItem
                        passed={analysis.lexical.numWordsFound === 0}
                        label="Números por Extenso"
                        value={analysis.lexical.numWordsFound.toString()}
                        sub={analysis.lexical.numWordsFound > 0 ? "Use dígitos (ex: 3) ao invés de texto" : "Correto"}
                    />
                    <CheckItem
                        passed={true}
                        label="Nível de Vocabulário"
                        value={analysis.lexical.vocabLevel}
                        sub="Baseado no tamanho médio das palavras"
                    />
                </Card>

                {/* 4. Semantic */}
                <Card
                    title="Análise Semântica"
                    icon={<Activity className="text-orange-400" size={20} />}
                    scoreColor="orange"
                >
                    <CheckItem
                        passed={analysis.semantic.measurableCount > 0}
                        label="Conquistas Mensuráveis"
                        value={`${analysis.semantic.measurableCount} itens`}
                        sub={analysis.semantic.measurableCount === 0 ? "Tente adicionar números e métricas (%, R$)" : "Bom uso de métricas"}
                    />
                    <CheckItem
                        passed={analysis.semantic.hardSkillsCount >= 5}
                        label="Densidade de Skills Técnicas"
                        value={`${analysis.semantic.hardSkillsCount}`}
                        sub={analysis.semantic.hardSkillsCount < 5 ? "Adicione mais tecnologias" : "Boa quantidade"}
                    />
                </Card>
            </div>

            {/* Hint */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-sm text-slate-400">
                <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                <p>
                    Esta análise é uma simulação baseada em boas práticas de mercado. Pontuações acima de 80 são consideradas excelentes para passar em triagens automáticas.
                </p>
            </div>

        </div>
    );
}

// --- UI Components ---

function Card({ title, icon, children, scoreColor }: { title: string, icon: React.ReactNode, children: React.ReactNode, scoreColor: string }) {
    return (
        <div className="bg-[#0E0E0E] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-${scoreColor}-500/10 border border-${scoreColor}-500/20`}>
                    {icon}
                </div>
                <h3 className="font-bold text-white text-lg">{title}</h3>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function CheckItem({ passed, label, value, sub }: { passed: boolean, label: string, value: string, sub?: string }) {
    return (
        <div className="flex justify-between items-start group">
            <div className="flex items-start gap-3">
                {passed ? (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                    <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                    <p className={`text-sm font-medium ${passed ? "text-slate-300" : "text-amber-200"}`}>{label}</p>
                    {sub && <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>}
                </div>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded">{value}</span>
        </div>
    );
}

function LabelStatus({ passed, label }: { passed: boolean, label: string }) {
    return (
        <div className="flex items-center gap-2">
            {passed ? (
                <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
                <XCircle size={14} className="text-red-500" />
            )}
            <span className={`text-sm ${passed ? "text-slate-400" : "text-slate-500 line-through"}`}>{label}</span>
        </div>
    );
}
