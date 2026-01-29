import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Diamond, HeartHandshake, Scale, ShieldCheck, Sparkles } from 'lucide-react';

export default function ValuesPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#A451FF]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00F26B]/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#A451FF] hover:text-white transition-colors mb-12">
                    <ArrowLeft size={16} /> Voltar para Home
                </Link>

                <header className="mb-20 text-center md:text-left">
                    <span className="text-[#00F26B] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Manifesto</span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-6">
                        Valores & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A451FF] to-[#00F26B]">Princípios Inegociáveis</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Não somos apenas uma fábrica de software. Somos artesãos digitais comprometidos com a excelência, ética e relações humanas verdadeiras.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-[#0E0E0E] border border-white/5 p-10 rounded-3xl hover:border-[#A451FF]/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-[#A451FF]/10 flex items-center justify-center text-[#A451FF] mb-6 group-hover:bg-[#A451FF] group-hover:text-black transition-colors">
                            <Sparkles size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-white mb-4">Trabalho Artesanal</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Nosso trabalho é feito com carinho, esmero e capricho. Rejeitamos a produção em massa de código sem alma. Cada projeto é tratado como uma obra única, onde a qualidade técnica e o acabamento visual são prioridades absolutas.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#0E0E0E] border border-white/5 p-10 rounded-3xl hover:border-[#00F26B]/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B] mb-6 group-hover:bg-[#00F26B] group-hover:text-black transition-colors">
                            <HeartHandshake size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-white mb-4">Respeito e Elegância</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Valorizamos todos os clientes igualmente, independentemente do valor do contrato. Jamais desmarcamos uma reunião para priorizar outro cliente. O tratamento é sempre premium, pautado na educação, pontualidade e transparência.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#0E0E0E] border border-white/5 p-10 rounded-3xl hover:border-white/20 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                            <Diamond size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-white mb-4">Integridade Inegociável</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Não trocamos nossos princípios por dinheiro. Não aceitamos projetos que violem nossa ética ou parcerias baseadas em promessas ilusórias. Temos orgulho de selecionar nossos clientes a dedo e manter um padrão moral elevado em todas as negociações.
                        </p>
                    </div>

                    {/* Card 4 - Modified */}
                    <div className="bg-[#0E0E0E] border border-white/5 p-10 rounded-3xl hover:border-red-500/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <Scale size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-white mb-4">Compliance Rigoroso</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Parcerias e contratos seguem regras estritas. Exigimos formalidade, cumprimento de prazos (agendamentos com 24h de antecedência) e respeito mútuo. Posturas inadequadas resultam no encerramento imediato da relação comercial, pois a paz e o respeito valem mais que qualquer contrato.
                        </p>
                    </div>

                    {/* Card 5 - New */}
                    <div className="bg-[#0E0E0E] border border-white/5 p-10 rounded-3xl hover:border-blue-500/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-white mb-4">Segurança Cognitiva</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Em um mundo de IA generativa, a proteção de dados e da propriedade intelectual é vital. Implementamos barreiras éticas e técnicas para garantir que a inteligência artificial amplie o potencial humano sem comprometer a privacidade ou a segurança estratégica do negócio.
                        </p>
                    </div>

                    {/* Card 6 - New */}
                    <div className="bg-[#0E0E0E] border border-white/5 p-10 rounded-3xl hover:border-yellow-500/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <Sparkles size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-white mb-4">Essência Humana</h3>
                        <p className="text-slate-400 leading-relaxed">
                            A tecnologia é o meio, não o fim. Por trás de cada linha de código e cada algoritmo, existe um propósito humano legítimo. Não automatizamos por automatizar; criamos sistemas que libertam pessoas de tarefas repetitivas para que possam focar no que realmente importa: criar, sentir e viver.
                        </p>
                    </div>
                </div>

                <div className="mt-20 p-8 border border-[#A451FF]/20 bg-[#A451FF]/5 rounded-2xl text-center">
                    <h4 className="text-white font-bold uppercase tracking-widest mb-2">Compromisso Hoffby</h4>
                    <p className="text-slate-300 italic">"Entregamos mais do que software. Entregamos confiança, segurança e um futuro construído com bases sólidas."</p>
                </div>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center text-slate-600 text-sm">
                    <p>© 2026 Hoffby Tecnologia Ltda. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}
