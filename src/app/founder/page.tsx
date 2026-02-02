'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Github, Linkedin, MapPin, Award,
    Users, ShieldCheck, Terminal, Bike, Cpu,
    History, ArrowRight, BrainCircuit
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function FounderPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#A451FF]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#00F26B]/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#A451FF] hover:text-white transition-colors mb-12">
                        <ArrowLeft size={16} /> Voltar para Home
                    </Link>

                    {/* HERO SECTION */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F26B]/20 bg-[#00F26B]/5 mb-8">
                                <div className="w-2 h-2 rounded-full bg-[#00F26B] animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">
                                    Founder & Tech Lead
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-8 leading-[0.9]">
                                Hugo <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A451FF] to-[#00F26B]">Alves.</span>
                            </h1>

                            <div className="text-xl text-slate-400 leading-relaxed max-w-2xl border-l-4 border-[#A451FF] pl-6 py-2 mb-10">
                                <p>
                                    "A tecnologia é a extensão da vontade humana. Meu propósito é criar sistemas que não apenas funcionem, mas que inspirem e empoderem quem os utiliza."
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/in/hugoinsider/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0077B5] text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-[#006097] transition-all flex items-center gap-2 shadow-lg shadow-[#0077B5]/20">
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                                <a href="https://github.com/hugoinsider" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#24292e] text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-[#1a1e22] transition-all flex items-center gap-2 border border-white/10">
                                    <Github size={18} /> GitHub
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#A451FF]/20 to-transparent opacity-60 z-10 mix-blend-overlay" />
                                <Image
                                    src="/1767834710412.jpg"
                                    alt="Hugo Alves"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />

                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <div className="bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex justify-between items-center">
                                        <div>
                                            <div className="text-white font-bold uppercase">Jandaia, Goiás</div>
                                            <div className="text-[10px] text-[#00F26B] font-mono">BRA_HQS_01</div>
                                        </div>
                                        <MapPin className="text-[#A451FF]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* STORY SECTION */}
                    <section className="mb-32">
                        <div className="flex flex-col md:flex-row items-end gap-6 mb-16">
                            <div>
                                <span className="text-[#A451FF] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Trajetória</span>
                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
                                    Do Asfalto <br /> ao Algoritmo.
                                </h2>
                            </div>
                            <div className="w-full h-px bg-white/10 mb-8 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                                <p>
                                    Minha jornada não começou em um laboratório de informática, mas nas ruas. O nome <strong>Hoffby</strong> carrega o DNA desse início: uma homenagem à lenda do BMX Street, <span className="text-white">Bruno Hoffmann</span>.
                                </p>
                                <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
                                    <Bike className="text-[#00F26B] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase mb-2">A Lição do BMX</h4>
                                        <p className="text-sm">
                                            No esporte, aprendi que a queda é apenas um dado estatístico no caminho para o acerto. Trouxe essa resiliência para a engenharia: cada bug é um obstáculo, cada refatoração é um aprimoramento de técnica.
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    Aos <strong>12 anos (2013)</strong>, enquanto muitos apenas jogavam, eu já descompilava códigos. Comecei criando plugins para servidores de Minecraft em Java e Lua, e desenvolvendo jogos em C++ na Unity 3D. Ali, sem saber, eu já era um engenheiro de software.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { year: "2013", title: "Início Autodidata", desc: "Java, Lua, C++ e lógica de programação." },
                                    { year: "2018", title: "Dev Júnior", desc: "Primeiros projetos comerciais e sistemas web." },
                                    { year: "2020", title: "Dev Pleno", desc: "Escalabilidade, React.js e Node.js em produção." },
                                    { year: "2020", title: "Founder Hoffby", desc: "Fundada em Agosto. O início da visão de software de elite." },
                                    { year: "2022", title: "Senior & Tech Lead", desc: "Arquitetura, liderança de times e Cloud Computing." },
                                    { year: "2024", title: "Hoffby AI", desc: "Pivô para IA Generativa e soluções cognitivas avançadas." }
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex gap-6 items-center p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default">
                                        <div className="text-2xl font-black text-[#A451FF] w-20 text-right font-mono">{item.year}</div>
                                        <div className="w-px h-12 bg-white/10 group-hover:bg-[#00F26B] transition-colors" />
                                        <div>
                                            <h4 className="text-white font-bold uppercase text-sm">{item.title}</h4>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* TECH STACK & EXPERTISE */}
                    <section className="mb-32">
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[40px] p-10 md:p-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                                <Cpu size={400} />
                            </div>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div>
                                    <span className="text-[#00F26B] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Expertise</span>
                                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-8">
                                        Engenharia <br /> de Elite.
                                    </h2>
                                    <p className="text-slate-400 mb-8">
                                        Não sou apenas um gestor; sou um <strong>Maker</strong>. Atuo diretamente no código, garantindo que a arquitetura dos projetos da Hoffby siga os padrões mais rigorosos de segurança e performance.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <Users className="text-[#A451FF] mb-3" />
                                            <h4 className="text-white font-bold text-sm uppercase">Liderança Scrum</h4>
                                            <p className="text-xs text-slate-500 mt-1">Certificação 2019. Gestão ágil e eficiente.</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <ShieldCheck className="text-[#00F26B] mb-3" />
                                            <h4 className="text-white font-bold text-sm uppercase">Enterprise Grade</h4>
                                            <p className="text-xs text-slate-500 mt-1">Experiência em Fintech e sistemas críticos.</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Terminal size={18} className="text-[#00F26B]" /> Stack Atual
                                    </h3>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {/* Modern Stack */}
                                        {["Java", "Spring Boot", "GoLang", "Python", "Rust", "Deno", "Bun", "Node.js", "TypeScript", "React / Next.js", "FastAPI", "AWS", "Docker", "PostgreSQL", "Redis", "OpenAI API", "LangChain"].map((tech) => (
                                            <span key={tech} className="px-4 py-2 bg-black border border-white/10 rounded-lg text-sm font-mono text-slate-300 hover:border-[#A451FF] hover:text-[#A451FF] transition-colors cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <History size={18} className="text-slate-500" /> Background Técnico
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Legacy / Background */}
                                        {["C#", "PHP", "Laravel", "Pascal", "C++", "Lua"].map((tech) => (
                                            <span key={tech} className="px-4 py-2 bg-[#0E0E0E] border border-white/5 rounded-lg text-sm font-mono text-slate-500 hover:border-white/20 hover:text-slate-300 transition-colors cursor-default" title="Background Técnico">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-10 p-6 bg-gradient-to-r from-[#A451FF]/10 to-transparent border-l-2 border-[#A451FF] rounded-r-xl">
                                        <p className="text-sm text-slate-300 italic">
                                            "O código é a poesia moderna. Quando bem escrito, ele não apenas executa uma função, ele conta uma história de eficiência e elegância."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA / CONTACT */}
                    <section className="text-center">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-8">Vamos construir o futuro?</h2>
                        <Link href="/#contato" className="inline-flex px-10 py-5 bg-[#00F26B] text-black font-black uppercase text-sm tracking-widest rounded-full hover:bg-[#00d65e] transition-all shadow-[0_0_40px_rgba(0,242,107,0.3)] hover:scale-105">
                            Iniciar Projeto <ArrowRight className="ml-2" />
                        </Link>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
