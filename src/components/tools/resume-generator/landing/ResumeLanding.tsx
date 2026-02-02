'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight, CheckCircle2, Download, FileJson, LayoutTemplate,
    Rocket, Sparkles, Star, ShieldCheck, Zap, ChevronDown,
    CreditCard, PenTool, MousePointerClick, Check,
    Code2, Terminal, Cpu, Database, Award, UserCheck, Search, Users, X,
    Briefcase, RefreshCw, Lock,
    Mail, MessageCircle, CheckSquare, Send
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export function ResumeLanding() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-white font-sans">
            {/* Navbar Simplified */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Logo className="w-18 h-18" />
                        {/* <span className="font-bold text-xl tracking-tight hidden md:block">
                            Hoffby <span className="text-emerald-500">Tools</span>
                        </span> */}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
                            Preços
                        </Link>
                        <Link
                            href="/ferramentas/gerador-curriculo/app"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-all text-sm font-bold hover:scale-105 active:scale-95"
                        >
                            Criar Currículo
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500 opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-500 opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles size={14} />
                        <span>v1.0 Release</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Crie Grátis. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Pague Se Gostar.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        O gerador de currículos mais moderno do mercado.
                        Preencha seus dados, visualize em tempo real e pague apenas para baixar o PDF em alta qualidade.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link
                            href="/ferramentas/gerador-curriculo/app"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 min-w-[200px] rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300"
                        >
                            <span className="relative z-10">Começar Agora</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="#pricing"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
                        >
                            Ver Modelo
                        </Link>
                    </div>

                    {/* Stats / Trust */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-white mb-1">10k+</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Currículos Gerados</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-white mb-1">R$ 10,00</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Taxa Única</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-white mb-1">4.9/5</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Avaliação</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 1: Target Audience */}
            <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black mb-4">Para quem?</h2>
                        <p className="text-slate-400">Desenvolvemos cada detalhe pensando em profissionais de tecnologia.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-emerald-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Iniciantes (Júnior)</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Está começando? Nossos modelos destacam projetos pessoais e skills, tirando o foco da falta de experiência formal.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Plenos & Sêniores</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Estrutura densa que comporta histórico extenso sem poluição visual. Foco em impacto e métricas.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-purple-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                <RefreshCw size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Transição de Carreira</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Campos flexíveis para conectar suas habilidades anteriores com o novo mundo tech.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 2: Feature Grid */}
            <section className="py-24 px-6 bg-[#050505] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                                Ferramentas poderosas para <span className="text-emerald-500">destacar você.</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 flex-shrink-0 flex items-center justify-center text-emerald-500">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Preview em Tempo Real</h4>
                                        <p className="text-sm text-slate-400">Digite e veja a mudança na hora. Sem "f5", sem surpresas.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 flex-shrink-0 flex items-center justify-center text-cyan-500">
                                        <FileJson size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Exportação JSON</h4>
                                        <p className="text-sm text-slate-400">Seus dados são seus. Baixe o JSON gratuitamente e importe quando quiser editar.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 flex-shrink-0 flex items-center justify-center text-purple-500">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Privacidade Total</h4>
                                        <p className="text-sm text-slate-400">Não vendemos seus dados. Tudo fica salvo no seu navegador (LocalStorage) até você limpar.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl opacity-30 rounded-full" />
                            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl">
                                {/* Abstract UI Representation */}
                                <div className="space-y-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                    </div>
                                    <div className="h-4 bg-white/10 rounded w-1/3" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-white/5 rounded border border-white/5" />
                                        <div className="h-24 bg-white/5 rounded border border-white/5" />
                                    </div>
                                    <div className="h-32 bg-white/5 rounded border border-white/5" />
                                </div>
                                <div className="absolute bottom-6 right-6">
                                    <Link href="/ferramentas/gerador-curriculo/app" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg text-sm hover:bg-emerald-400">
                                        Testar Editor <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 3: Trust / Guarantee */}
            <section className="py-20 px-6 bg-[#080808]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#111] border border-white/10 text-emerald-500 mb-6">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Pagamento Seguro & Garantido</h2>
                    <p className="text-slate-400 max-w-xl mx-auto mb-8">
                        Utilizamos processadores de pagamento líderes de mercado. Seu download é liberado instantaneamente após a confirmação do PIX. Se houver qualquer problema técnico com seu arquivo, devolvemos seu dinheiro.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 opacity-50">
                        <div className="px-4 py-2 border border-white/10 rounded bg-[#111] text-xs font-mono text-slate-500">SSL ENCRYPTED</div>
                        <div className="px-4 py-2 border border-white/10 rounded bg-[#111] text-xs font-mono text-slate-500">INSTANT DELIVERY</div>
                        <div className="px-4 py-2 border border-white/10 rounded bg-[#111] text-xs font-mono text-slate-500">24/7 SUPPORT</div>
                    </div>
                </div>
            </section>

            {/* Section 1: Tech Stack Support */}
            <section className="py-12 border-y border-white/5 bg-[#080808] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-8">Compatível com suas stacks favoritas</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <div className="flex items-center gap-2"><Code2 size={24} /> <span className="font-bold">React</span></div>
                        <div className="flex items-center gap-2"><Terminal size={24} /> <span className="font-bold">Node.js</span></div>
                        <div className="flex items-center gap-2"><Database size={24} /> <span className="font-bold">SQL</span></div>
                        <div className="flex items-center gap-2"><Cpu size={24} /> <span className="font-bold">Python</span></div>
                        <div className="flex items-center gap-2"><LayoutTemplate size={24} /> <span className="font-bold">Figma</span></div>
                        <div className="flex items-center gap-2"><Zap size={24} /> <span className="font-bold">Next.js</span></div>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-24 px-6 bg-[#0A0A0A] relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-6">Como Funciona</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Processo simples, transparente e sem pegadinhas.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20" />

                        <div className="relative text-center group">
                            <div className="w-20 h-20 mx-auto bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <PenTool className="text-emerald-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">1. Preencha</h3>
                            <p className="text-slate-400 text-sm leading-relaxed px-4">
                                Insira seus dados, experiências e projetos. Use nosso assistente de IA para melhorar seus textos.
                            </p>
                        </div>

                        <div className="relative text-center group">
                            <div className="w-20 h-20 mx-auto bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <MousePointerClick className="text-cyan-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">2. Personalize</h3>
                            <p className="text-slate-400 text-sm leading-relaxed px-4">
                                Escolha entre modelos Modernos, Clássicos ou Minimalistas. Altere cores e fontes em tempo real.
                            </p>
                        </div>

                        <div className="relative text-center group">
                            <div className="w-20 h-20 mx-auto bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-purple-500/50 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <Download className="text-purple-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">3. Baixe</h3>
                            <p className="text-slate-400 text-sm leading-relaxed px-4">
                                Pague apenas uma taxa única de R$ 10,00 para baixar seu PDF sem marca d'água.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Comparison Table */}
            <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Por que escolher o Hoffby?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Compare e veja por que somos a melhor opção.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 text-slate-500 font-medium">Recursos</th>
                                    <th className="p-4 bg-[#111] rounded-t-xl text-emerald-400 font-bold text-center border-b-2 border-emerald-500">Hoffby Tools</th>
                                    <th className="p-4 text-slate-500 font-medium text-center">Editores Online</th>
                                    <th className="p-4 text-slate-500 font-medium text-center">Word / Docs</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="p-4 text-slate-300 font-medium">Design Premium</td>
                                    <td className="p-4 bg-[#111]/50 text-center"><CheckCircle2 className="inline text-emerald-500" size={20} /></td>
                                    <td className="p-4 text-center"><CheckCircle2 className="inline text-slate-600" size={20} /></td>
                                    <td className="p-4 text-center"><X className="inline text-red-500/50" size={20} /></td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-slate-300 font-medium">Otimizado para ATS</td>
                                    <td className="p-4 bg-[#111]/50 text-center"><CheckCircle2 className="inline text-emerald-500" size={20} /></td>
                                    <td className="p-4 text-center"><X className="inline text-red-500/50" size={20} /></td>
                                    <td className="p-4 text-center"><CheckCircle2 className="inline text-slate-600" size={20} /></td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-slate-300 font-medium">Exportação JSON</td>
                                    <td className="p-4 bg-[#111]/50 text-center"><CheckCircle2 className="inline text-emerald-500" size={20} /></td>
                                    <td className="p-4 text-center"><X className="inline text-red-500/50" size={20} /></td>
                                    <td className="p-4 text-center"><X className="inline text-red-500/50" size={20} /></td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-slate-300 font-medium">Custo</td>
                                    <td className="p-4 bg-[#111] rounded-b-xl text-center font-bold text-white">R$ 10,00 (Único)</td>
                                    <td className="p-4 text-center text-slate-500">Assinatura Mensal</td>
                                    <td className="p-4 text-center text-slate-500">Grátis</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Improved Templates Showcase */}
            <section className="py-24 px-6 bg-[#0A0A0A] overflow-hidden">
                <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Modelos Premium</h2>
                        <p className="text-slate-400 max-w-xl">Designs pensados para destacar suas habilidades e passar pelos robôs de recrutamento (ATS).</p>
                    </div>
                    <Link href="/ferramentas/gerador-curriculo/app" className="flex items-center gap-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors">
                        Ver todos os modelos <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Template 1 - Modern */}
                    <div className="group rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative">
                        <div className="h-96 bg-[#151515] relative overflow-hidden">
                            <Image
                                src="/gerador-curriculo/2026-02-01_00-29.png"
                                alt="Modelo Moderno"
                                fill
                                className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />

                            {/* Overlay Action */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                                <Link href="/ferramentas/gerador-curriculo/app" className="px-6 py-3 rounded-full bg-emerald-500 text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    Usar este modelo <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="p-6 absolute bottom-0 left-0 right-0">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-400">Tech</span>
                                <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-400">ATS Friendly</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Modern Tech <Zap size={16} className="text-emerald-500 fill-emerald-500" /></h3>
                            <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">Ideal para desenvolvedores e designers. Visual limpo com toques de cor estratégica para destacar skills.</p>
                        </div>
                    </div>

                    {/* Template 2 - Classic */}
                    <div className="group rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative">
                        <div className="h-96 bg-[#151515] relative overflow-hidden">
                            <Image
                                src="/gerador-curriculo/2026-02-01_00-29_1.png"
                                alt="Modelo Clássico"
                                fill
                                className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />

                            {/* Overlay Action */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                                <Link href="/ferramentas/gerador-curriculo/app" className="px-6 py-3 rounded-full bg-cyan-500 text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    Usar este modelo <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="p-6 absolute bottom-0 left-0 right-0">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-wider text-cyan-400">Executivo</span>
                                <span className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-wider text-cyan-400">Corporativo</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Classic Executive <Award size={16} className="text-cyan-500 fill-cyan-500" /></h3>
                            <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">Focado em hierarquia e legibilidade. Perfeito para cargos de gestão, financeiro e jurídico.</p>
                        </div>
                    </div>

                    {/* Template 3 - Minimal */}
                    <div className="group rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative">
                        <div className="h-96 bg-[#151515] relative overflow-hidden">
                            <Image
                                src="/gerador-curriculo/2026-02-01_00-29_2.png"
                                alt="Modelo Minimalista"
                                fill
                                className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />

                            {/* Overlay Action */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                                <Link href="/ferramentas/gerador-curriculo/app" className="px-6 py-3 rounded-full bg-white text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    Usar este modelo <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="p-6 absolute bottom-0 left-0 right-0">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">Universal</span>
                                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">Clean</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Minimalist BW <LayoutTemplate size={16} className="text-white fill-white" /></h3>
                            <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">Preto e branco. Direto ao ponto. Máxima compatibilidade com qualquer sistema ou impressora.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Recruiter Insights */}
            <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-4">
                            <UserCheck size={12} className="text-purple-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">
                                Visão do Recrutador
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6">O que eles realmente olham?</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Search size={80} /></div>
                            <h3 className="text-4xl font-black text-white mb-2">6s</h3>
                            <p className="font-bold text-slate-300 mb-4">Tempo médio de leitura</p>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Recrutadores escaneiam currículos em segundos. Nossos layouts guiam o olhar para o que importa: Cargo, Empresa e Skills.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Database size={80} /></div>
                            <h3 className="text-4xl font-black text-white mb-2">ATS</h3>
                            <p className="font-bold text-slate-300 mb-4">Applicant Tracking Systems</p>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Robôs leem seu CV antes de humanos. Evitamos colunas complexas e gráficos que confundem a inteligência artificial.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={80} /></div>
                            <h3 className="text-4xl font-black text-white mb-2">Resultados</h3>
                            <p className="font-bold text-slate-300 mb-4">Impacto &gt; Tarefas</p>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Nossos campos incentivam você a descrever conquistas ("Aumentei vendas em 20%") em vez de apenas funções.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Testimonials */}
            <section className="py-24 px-6 bg-[#0A0A0A] border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Quem usa, aprova</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Carlos M.", role: "Senior Frontend Dev", text: "Fiz meu currículo em 5 minutos e passei na triagem da Amazon. O modelo clean fez toda a diferença." },
                            { name: "Ana P.", role: "UX Designer", text: "Estava cansada de brigar com o Word. O gerador é intuitivo e o resultado final é super profissional." },
                            { name: "Lucas S.", role: "Tech Lead", text: "Recomendo para todos os meus mentorados. A estrutura foca no que precisamos ver numa entrevista técnica." }
                        ].map((t, i) => (
                            <div key={i} className="bg-[#111] p-8 rounded-2xl border border-white/5 relative">
                                <Users className="text-emerald-500 mb-4 opacity-50" size={24} />
                                <p className="text-slate-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                                <div>
                                    <div className="font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-emerald-500 uppercase tracking-wider font-bold">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section - Repositioned? No, keeping flow */}
            <section id="pricing" className="py-24 px-6 bg-[#050505] border-y border-white/5 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Preço Justo e Transparente</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Você só paga pela entrega final. Teste tudo antes de decidir.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Tier */}
                        <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 flex flex-col relative group">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-200">Criação & Preview</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-white">R$ 0</span>
                                    <span className="text-lg text-slate-500 font-medium">/sempre</span>
                                </div>
                                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                                    Use todas as ferramentas de edição e preview ilimitadas.
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <Check className="text-emerald-500" size={18} /> Acesso a todos os modelos
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <Check className="text-emerald-500" size={18} /> Edição em tempo real
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <Check className="text-emerald-500" size={18} /> Exportação JSON (Dados)
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <Check className="text-emerald-500" size={18} /> Análise de IA Básica
                                </li>
                            </ul>

                            <Link
                                href="/ferramentas/gerador-curriculo/app"
                                className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold text-center transition-all"
                            >
                                Começar Grátis
                            </Link>
                        </div>

                        {/* Paid Tier */}
                        <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-900/10 to-[#0A0A0A] border border-emerald-500/50 flex flex-col relative overflow-hidden group shadow-2xl shadow-emerald-500/10">
                            <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                                Mais Popular
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white">Download Premium</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-emerald-400">R$ 5</span>
                                    <span className="text-lg text-slate-500 font-medium">/download</span>
                                </div>
                                <p className="mt-4 text-emerald-100/60 text-sm leading-relaxed">
                                    O arquivo final em alta qualidade, pronto para enviar.
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <CheckCircle2 className="text-emerald-400" size={18} /> PDF em Alta Definição
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <CheckCircle2 className="text-emerald-400" size={18} /> Sem Marca d'água
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <CheckCircle2 className="text-emerald-400" size={18} /> Links Clicáveis
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <CheckCircle2 className="text-emerald-400" size={18} /> Compatível com ATS
                                </li>
                            </ul>

                            <Link
                                href="/ferramentas/gerador-curriculo/app"
                                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-center transition-all shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-1"
                            >
                                Criar e Baixar
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-[#0A0A0A]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Preciso pagar para testar?",
                                a: "Não! A criação, edição e visualização do currículo são 100% gratuitas. Você só paga R$ 10,00 se gostar do resultado e quiser baixar o arquivo final em PDF."
                            },
                            {
                                q: "Posso editar depois de baixar?",
                                a: "Sim. Você pode exportar seus dados em formato JSON (gratuito) e importá-los novamente na ferramenta quando precisar fazer atualizações."
                            },
                            {
                                q: "Os modelos servem para quais áreas?",
                                a: "Nossos modelos foram criados com foco em tecnologia (Desenvolvedores, Designers, Product Managers), mas a estrutura flexível funciona perfeitamente para administrativo, marketing e outras áreas corporativas."
                            },
                            {
                                q: "Como funciona o pagamento?",
                                a: "Aceitamos PIX para aprovação instantânea. Assim que o pagamento é confirmado, o download do seu PDF é liberado automaticamente."
                            }
                        ].map((item, i) => (
                            <div key={i} className="border border-white/5 rounded-xl bg-[#050505] overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-slate-200">{item.q}</span>
                                    <ChevronDown
                                        className={`text-slate-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10 p-8 md:p-16 rounded-3xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
                    <div className="inline-block p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-8 animate-pulse">
                        <Rocket size={32} />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
                        Sua próxima vaga começa aqui.
                    </h2>

                    <p className="text-xl text-slate-400 mb-12">
                        Junte-se a milhares de profissionais que conseguiram suas vagas usando nossos modelos.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/ferramentas/gerador-curriculo/app"
                            className="group px-10 py-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Criar Meu Currículo <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>


            {/* Contact Section */}
            <section id="contato" className="py-32 px-6 relative z-10 bg-[#050505] border-t border-white/5">
                <div className="max-w-5xl mx-auto bg-[#0E0E0E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10">
                    <div className="bg-[#151515] px-4 py-3 border-b border-white/5 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="ml-4 text-[10px] text-slate-500 font-mono">root@resume-builder:~/contact</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-10 border-r border-white/5 bg-white/[0.01]">
                            <h3 className="text-2xl font-black uppercase text-white mb-6">Dúvidas?</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Mail size={18} /></div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-500">Email</div>
                                        <div className="text-white text-sm">hoffby@hoffby.com.br</div>
                                    </div>
                                </div>
                                <a href="https://wa.me/5564992263914" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-lg -ml-2 transition-all">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                        <MessageCircle size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-emerald-500 transition-colors">Whatsapp</div>
                                        <div className="text-white text-sm group-hover:text-emerald-500 transition-colors">+55 (64) 99226-3914</div>
                                    </div>
                                </a>
                            </div>

                            <div className="mt-12 font-mono text-xs">
                                <p className="text-slate-500 mb-2">{'// System Status:'}</p>
                                {status === 'idle' && <span className="text-slate-400 animate-pulse">Waiting for user input...</span>}
                                {status === 'loading' && <span className="text-emerald-500">Establishing secure connection...</span>}
                                {status === 'success' && <span className="text-emerald-400">Data packet sent to Hoffby DB.</span>}
                                {status === 'error' && <span className="text-red-500">Connection failed. Try again.</span>}
                            </div>
                        </div>

                        <div className="p-10 font-mono relative">
                            {status === 'success' && (
                                <div className="absolute inset-0 z-20 bg-[#0E0E0E]/95 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm animate-in fade-in duration-300">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-500/20">
                                        <CheckSquare size={32} />
                                    </div>
                                    <h4 className="text-xl font-black uppercase text-white mb-2">Mensagem Recebida</h4>
                                    <p className="text-slate-400 text-sm mb-6">Sua mensagem foi enviada. Responderemos em breve.</p>
                                    <button onClick={() => setStatus('idle')} className="text-xs font-bold text-emerald-500 hover:text-white transition-colors uppercase tracking-widest border-b border-emerald-500 pb-1">Enviar Novo Comando</button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-emerald-500 text-xs mb-2">$ input_name:</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700" placeholder="Seu Nome_" />
                                </div>
                                <div>
                                    <label className="block text-emerald-500 text-xs mb-2">$ input_email:</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700" placeholder="seu@email.com_" />
                                </div>
                                <div>
                                    <label className="block text-emerald-500 text-xs mb-2">$ input_message:</label>
                                    <textarea rows={3} name="message" required value={formData.message} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-slate-700" placeholder="// Digite sua dúvida ou sugestão..." />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4 rounded-lg ${status === 'loading' ? 'bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-white text-black hover:bg-emerald-500'}`}
                                >
                                    {status === 'loading' ? 'Processing...' : <><Send size={14} /> Executar Envio</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Simple */}
            <footer className="py-12 px-6 border-t border-white/5 bg-[#050505] text-center mb-20 md:mb-0">
                <p className="text-slate-600 text-sm">
                    &copy; {new Date().getFullYear()} Hoffby tecnologia ltda. Desenvolvido para a comunidade.
                </p>
            </footer>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/5564992263914?text=Olá,%20tenho%20uma%20dúvida%20sobre%20o%20Gerador%20de%20Currículo."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
            >
                <MessageCircle size={32} className="text-white" />
                <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Fale Conosco
                </span>
            </a>
        </div>
    );
}
