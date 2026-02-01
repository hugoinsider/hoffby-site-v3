'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight, CheckCircle2, Download, FileJson, LayoutTemplate,
    Rocket, Sparkles, Star, ShieldCheck, Zap, ChevronDown,
    CreditCard, PenTool, MousePointerClick, Check
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export function ResumeLanding() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-white font-sans">
            {/* Navbar Simplified */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Logo className="w-20 h-20" />
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
                        <span>Gerador Profissional</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Crie Grátis. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Pague Só Se Gostar.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        O gerador de currículos mais moderno do mercado.
                        Preencha seus dados, visualize em tempo real e exporte em PDF de alta qualidade por um preço justo.
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
                            Ver Preços
                        </Link>
                    </div>

                    {/* Stats / Trust */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-white mb-1">10k+</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Currículos Gerados</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-white mb-1">Instantâneo</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Sem Cadastro</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-white mb-1">4.9/5</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Avaliação</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-24 px-6 bg-[#0A0A0A] relative border-y border-white/5">
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
                                Gostou do resultado? Pague apenas uma taxa única de R$ 5,00 para baixar seu PDF sem marca d'água.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Showcase */}
            <section className="py-24 px-6 bg-[#050505] overflow-hidden">
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
                    {/* Template 1 */}
                    <div className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-64 bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-black/80" />
                            {/* Mock UI */}
                            <div className="absolute top-4 left-4 right-4 bottom-0 bg-white shadow-2xl rounded-t-lg p-4 opacity-80 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-500">
                                <div className="w-1/3 h-2 bg-slate-800 mb-4" />
                                <div className="space-y-2">
                                    <div className="w-full h-1 bg-slate-200" />
                                    <div className="w-full h-1 bg-slate-200" />
                                    <div className="w-2/3 h-1 bg-slate-200" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Modern Tech</h3>
                            <p className="text-sm text-slate-400">Ideal para desenvolvedores e designers. Visual limpo com toques de cor.</p>
                        </div>
                    </div>

                    {/* Template 2 */}
                    <div className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-64 bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-black/80" />
                            {/* Mock UI */}
                            <div className="absolute top-4 left-4 right-4 bottom-0 bg-white shadow-2xl rounded-t-lg p-6 opacity-80 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-500 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-slate-200 mb-4" />
                                <div className="w-1/2 h-2 bg-slate-800 mb-2" />
                                <div className="w-1/3 h-1.5 bg-slate-400" />
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Classic Executive</h3>
                            <p className="text-sm text-slate-400">Focado em hierarquia e legibilidade. Perfeito para cargos de gestão.</p>
                        </div>
                    </div>

                    {/* Template 3 */}
                    <div className="group rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-64 bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/80" />
                            {/* Mock UI */}
                            <div className="absolute top-4 left-4 right-4 bottom-0 bg-white shadow-2xl rounded-t-lg p-6 opacity-80 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-500">
                                <div className="w-full h-px bg-black mb-4" />
                                <div className="w-1/2 h-2 bg-black mb-4" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-20 bg-slate-100" />
                                    <div className="h-20 bg-slate-100" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Minimalist BW</h3>
                            <p className="text-sm text-slate-400">Preto e branco. Direto ao ponto. Máxima compatibilidade ATS.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 bg-[#0A0A0A] border-y border-white/5 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Preço Justo e Transparente</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Você só paga pela entrega final. Teste tudo antes de decidir.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Tier */}
                        <div className="p-8 rounded-3xl bg-[#050505] border border-white/10 flex flex-col relative group">
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
                        <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-900/10 to-[#050505] border border-emerald-500/50 flex flex-col relative overflow-hidden group shadow-2xl shadow-emerald-500/10">
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
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Preciso pagar para testar?",
                                a: "Não! A criação, edição e visualização do currículo são 100% gratuitas. Você só paga R$ 5,00 se gostar do resultado e quiser baixar o arquivo final em PDF."
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
                            <div key={i} className="border border-white/5 rounded-xl bg-[#0A0A0A] overflow-hidden">
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
            <section className="py-24 px-6 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10 p-8 md:p-16 rounded-3xl border border-white/10 bg-[#050505]/80 backdrop-blur-xl">
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

            {/* Footer Simple */}
            <footer className="py-12 px-6 border-t border-white/5 bg-[#050505] text-center">
                <p className="text-slate-600 text-sm">
                    &copy; {new Date().getFullYear()} Hoffby tecnologia ltda. Desenvolvido para a comunidade.
                </p>
            </footer>
        </div>
    );
}
