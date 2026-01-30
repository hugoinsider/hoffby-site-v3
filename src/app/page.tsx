'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, ChevronDown, ShoppingBag,
  Cpu, Code2, BarChart3, Terminal, History, Bike,
  Send, Mail, Phone, Rocket, Lock,
  Bot, Layers, Gamepad2, Sparkles, Megaphone,
  BrainCircuit, Database, Workflow, Box, Scale, Diamond, Shield, FileText,
  CreditCard, Stethoscope, Users, CalendarCheck,
  CheckSquare, Linkedin, Github, MapPin, Award, ShieldCheck
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import Image from 'next/image';

// --- COMPONENTE DE FUNDO ---
const IdentityBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#A451FF]/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00F26B]/5 blur-[120px] rounded-full" />
  </div>
);

const GradientText = ({ children, from, to }: { children: React.ReactNode, from: string, to: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${from} ${to}`}>
    {children}
  </span>
);

// --- NAVBAR ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}
    >
      <div className={`max-w-7xl mx-auto py-3 px-6 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md rounded-full border border-white/5 shadow-2xl' : ''} flex justify-between items-center transition-all`}>
        <a href="#" className="flex items-center gap-3 group">
          <Logo className="w-24 h-11" />
          {/* <span className="text-xl font-black italic tracking-tighter text-white group-hover:text-[#00F26B] transition-colors">
            HOFFBY<span className="text-[#A451FF]">.TEC</span>
          </span> */}
        </a>
        <div className="hidden md:flex gap-8">
          {['Soluções', 'Cases', 'SaaS Factory', 'Legado', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00F26B] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <button onClick={() => window.location.href = '/#contato'} className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00F26B] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,107,0.4)]">
          Iniciar Projeto <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.nav>
  );
};

// --- HERO SECTION (RESTAURADO COM CARTÃO FLUTUANTE) ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* TEXTO HERO */}
        <motion.div className="lg:col-span-7" style={{ y: y1 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F26B]/20 bg-[#00F26B]/5 mb-8 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-[#00F26B] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">
              Intelligence Online
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-8">
            A Inteligência é <span className="text-[#A451FF]">Artificial.</span> <br />
            A Essência é <span className="text-[#00F26B]">Humana.</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-10 border-l-2 border-white/10 pl-6 bg-gradient-to-r from-white/5 to-transparent py-4 rounded-r-xl">
            Unimos a robustez da engenharia de software com o poder ilimitado da Inteligência Artificial Generativa.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-[#A451FF] text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-[#902bf5] transition-all shadow-[0_0_30px_rgba(164,81,255,0.3)]">
              Explorar Soluções
            </button>
            {/* Botão com âncora para os Cases */}
            <a href="#cases" className="px-8 py-4 bg-transparent border border-white/10 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center">
              Ver Cases
            </a>
          </div>
        </motion.div>

        {/* CARTÃO FLUTUANTE 3D (RESTAURADO) */}
        <motion.div className="lg:col-span-5 relative hidden lg:block w-[420px]" style={{ y: y2 }}>
          <div className="relative z-10 bg-gradient-to-b from-[#1a1a1a] to-[#050505] border border-white/10 rounded-[40px] p-8 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-all duration-700 group backdrop-blur-xl">
            <div className="flex justify-between items-start mb-12">
              <Cpu className="w-12 h-12 text-[#00F26B]" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-500">Uptime Garantido</div>
                <div className="text-2xl font-black text-white">99.9%</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-[#A451FF] animate-pulse" />
              </div>
              <div className="h-2 w-2/3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[60%] bg-[#00F26B] animate-pulse" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-4">
                <span>DEPLOY_STATUS</span>
                <span className="text-[#00F26B]">SUCCESS</span>
              </div>
            </div>
          </div>
          {/* Glow traseiro do cartão */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#A451FF] to-[#00F26B] blur-[80px] opacity-20 -z-10 rounded-full" />
        </motion.div>

      </div>
    </section>
  );
};

// --- AI POWERHOUSE ---
const AIPowerhouse = () => {
  const techs = [
    "OpenAI", "Claude", "Gemini", "Vertex AI", "AutoML",
    "TensorFlow", "PyTorch", "LangChain", "n8n", "CrewAI", "NotebookLM"
  ];
  return (
    <section className="py-24 bg-[#080808]/50 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase text-white tracking-tighter">
            AI Core <span className="text-[#A451FF]">&</span> Automations
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-2 uppercase tracking-widest">Powered by State-of-the-Art Models</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((tech, i) => (
            <div key={i} className="group relative px-6 py-3 bg-[#0E0E0E] border border-white/10 rounded-full hover:border-[#00F26B]/50 hover:bg-[#00F26B]/5 transition-all cursor-default">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A451FF] group-hover:bg-[#00F26B] transition-colors" />
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- [NOVO] SESSÃO DE CASES REAIS ---
const Cases = () => {
  const projects = [
    {
      title: "Fintech Colaborativa",
      category: "Plataforma de Pagamento",
      desc: "Sistema complexo de split de pagamentos em tempo real, carteira digital e alta segurança bancária.",
      icon: CreditCard,
      tech: "Node.js + AWS"
    },
    {
      title: "Varejo Omnichannel",
      category: "E-commerce High-End",
      desc: "Loja virtual com IA de recomendação, integração com estoques físicos e checkout transparente.",
      icon: ShoppingBag,
      tech: "Next.js + Shopify"
    },
    {
      title: "CRM Inteligente",
      category: "SaaS B2B",
      desc: "Dashboard de gestão de leads com automação de follow-up e análise preditiva de fechamento.",
      icon: Users,
      tech: "React + Python"
    },
    {
      title: "Health Tech",
      category: "Agendamento Médico",
      desc: "Plataforma para psicólogos e psiquiatras com prontuário eletrônico seguro e videochamada integrada.",
      icon: Stethoscope,
      tech: "WebRTC + Encryption"
    }
  ];

  return (
    <section id="cases" className="py-32 px-6 bg-[#020202] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-[#00F26B] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Portfolio Select</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
              Projetos que <br /><span className="text-white border-b-4 border-[#A451FF]">Transformaram</span>.
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm text-right">
            De plataformas financeiras robustas a soluções delicadas na área da saúde. Entregamos complexidade com elegância.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div key={idx} className="group relative bg-[#0E0E0E] border border-white/5 rounded-[30px] p-10 overflow-hidden hover:border-[#A451FF]/30 transition-all duration-500">
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A451FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/5 group-hover:bg-[#A451FF] group-hover:text-black transition-colors">
                      <proj.icon size={28} />
                    </div>
                    <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-500 uppercase">
                      {proj.tech}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white mb-2">{proj.title}</h3>
                  <p className="text-[#00F26B] text-xs font-bold uppercase tracking-widest mb-4">{proj.category}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{proj.desc}</p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:text-[#A451FF] transition-colors cursor-pointer">
                  Ver Detalhes <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- BENTO GRID SOLUÇÕES ---
const SolutionsBento = () => {
  return (
    <section id="soluções" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
            Soluções <span className="text-[#00F26B]">Especializadas.</span>
          </h2>
          <div className="h-1 w-20 bg-[#A451FF]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* CARD 1: IA PARA ECOMMERCE */}
          <div className="md:col-span-1 md:row-span-2 group relative rounded-[30px] bg-[#0E0E0E] border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-[#00F26B]/30 transition-all">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShoppingBag className="w-40 h-40 text-[#00F26B]" />
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#00F26B]/10 flex items-center justify-center mb-6 text-[#00F26B]">
                <ShoppingBag />
              </div>
              <h3 className="text-2xl font-black uppercase italic text-white mb-2">AI for Ecommerce</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Recomendação preditiva, precificação dinâmica e atendimento autônomo.
              </p>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-500 border border-white/5">Upsell AI</span>
            </div>
          </div>

          {/* CARD 2: SAAS FACTORY */}
          <div id="saas-factory" className="md:col-span-2 group relative rounded-[30px] bg-[#0E0E0E] border border-white/5 p-8 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden hover:border-[#A451FF]/30 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-[#A451FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#A451FF]/10 flex items-center justify-center text-[#A451FF]">
                  <Rocket />
                </div>
                <h3 className="text-2xl font-black uppercase italic text-white">SaaS & Micro-SaaS</h3>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Do MVP ao Scale-up. Construímos seu produto digital próprio com arquitetura multi-tenant.
              </p>
            </div>
            <div className="relative z-10 mt-6 md:mt-0">
              <button onClick={() => window.location.href = '/#contato'} className="px-6 py-2 bg-[#A451FF] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-colors">
                Validar Ideia
              </button>
            </div>
          </div>

          {/* CARD 3: IA MARKETING */}
          <div className="md:col-span-1 group relative rounded-[30px] bg-[#0E0E0E] border border-white/5 p-8 overflow-hidden hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500">
              <Megaphone />
            </div>
            <h3 className="text-xl font-black uppercase italic text-white mb-2">AI Marketing</h3>
            <p className="text-sm text-slate-400 font-medium">
              Geração de conteúdo, análise de sentimento e automação de funis com n8n.
            </p>
          </div>

          {/* CARD 4: 3D & GAMES */}
          <div className="md:col-span-1 group relative rounded-[30px] bg-[#0E0E0E] border border-white/5 p-8 overflow-hidden hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
              <Gamepad2 />
            </div>
            <h3 className="text-xl font-black uppercase italic text-white mb-2">3D & Games</h3>
            <p className="text-sm text-slate-400 font-medium">
              Assets generativos, NPCs inteligentes e experiências Web (Three.js).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- PROCESS SECTION ---
const Process = () => {
  const steps = [
    { id: "01", title: "Discovery", icon: BrainCircuit, desc: "Mapeamento de oportunidades de IA no seu negócio." },
    { id: "02", title: "Arquitetura", icon: Workflow, desc: "Design de agentes, automações e banco de dados vetoriais." },
    { id: "03", title: "Dev & Train", icon: Code2, desc: "Coding, fine-tuning de modelos e integração via API." },
    { id: "04", title: "Deploy", icon: Box, desc: "Lançamento em infraestrutura escalável (AWS/GCP)." },
  ];

  return (
    <section className="py-32 bg-[#080808]/50 relative border-t border-white/5 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-[#00F26B] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Metodologia</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
            Fluxo de <span className="text-white border-b-4 border-[#A451FF]">Inteligência</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-[#A451FF] via-[#00F26B] to-[#A451FF] opacity-20" />
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-[#0E0E0E] border border-white/10 rounded-full flex items-center justify-center mb-8 relative group hover:border-[#00F26B] transition-colors shadow-xl">
                <step.icon className="text-slate-400 group-hover:text-[#00F26B] transition-colors" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#A451FF] rounded-full flex items-center justify-center text-[10px] font-black text-white border-4 border-[#080808]">
                  {step.id}
                </div>
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl font-black uppercase text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ABOUT SECTION ---
const About = () => {
  return (
    <section id="legado" className="py-32 relative overflow-hidden z-10">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <Bike size={600} />
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <History className="w-5 h-5 text-[#A451FF]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A451FF]">DNA & História</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-8 leading-none">
            Do Asfalto <br />
            ao <span className="text-[#00F26B]">Algoritmo.</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              Tudo começou em 2013, nas ruas, não nos servidores. Inspirado pela lenda do BMX Street alemã, <span className="text-white">Bruno Hoffmann</span>, iniciamos uma jornada de expressão e resiliência sobre duas rodas. O nome <strong>Hoffby</strong> é uma homenagem direta a essa influência que moldou nosso caráter.
            </p>
            <p className="pl-6 border-l-2 border-[#00F26B] bg-gradient-to-r from-[#00F26B]/5 to-transparent py-4">
              <span className="text-white italic">{'"'}Do BMX, aprendemos que a queda é parte do processo de acertar a manobra perfeita.{'"'}</span>
            </p>
            <p>
              Trouxemos essa mentalidade do esporte para a tecnologia. A mesma obsessão por executar movimentos complexos com fluidez no asfalto agora aplicamos na arquitetura de algoritmos. Cada bug é um obstáculo, cada deploy é um acerto. A essência de cair e levantar mais forte continua a mesma.
            </p>
            <div className="mt-8">
              <Link href="/inspiracao" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#00F26B] hover:text-white transition-colors group">
                Ver Inspirações <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/5">
            {[{ val: "07", label: "Anos" }, { val: "+226", label: "Projetos" }, { val: "3k+", label: "Suportes" }].map((st, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-white">{st.val}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#A451FF] to-[#00F26B] rounded-[40px] blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-[#0E0E0E] rounded-[30px] border border-white/10 p-10 overflow-hidden">
            <div className="font-mono text-xs text-[#00F26B] mb-4">$ system_check --history</div>
            <div className="space-y-4">
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-lg">
                <Bike className="text-[#A451FF]" size={20} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Origem: Hoffbmx</span>
                  <span className="text-[9px] text-slate-500">LEGACY_MODULE</span>
                </div>
              </div>
              <div className="flex justify-center py-2"><div className="w-px h-8 bg-white/10" /></div>
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-lg border border-[#00F26B]/30">
                <Terminal className="text-[#00F26B]" size={20} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Destino: Hoffby</span>
                  <span className="text-[9px] text-slate-500">CURRENT_VERSION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

// --- TECH ROOTS SECTION ---
const TechRoots = () => {
  return (
    <section className="py-20 relative overflow-hidden z-10 border-t border-white/5 bg-[#080808]/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00F26B] to-[#A451FF] rounded-[30px] opacity-10 blur-xl" />
              <div className="relative bg-[#0E0E0E] rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Terminal className="text-[#00F26B]" size={24} />
                  <span className="font-mono text-sm text-slate-400">root@12yo:~# init_coding.sh</span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <p className="text-slate-300"><span className="text-[#A451FF]">❯</span> Loading Minecraft Plugins (Java/Lua)... <span className="text-[#00F26B]">OK</span></p>
                  <p className="text-slate-300"><span className="text-[#A451FF]">❯</span> Initializing Eclipse IDE... <span className="text-[#00F26B]">OK</span></p>
                  <p className="text-slate-300"><span className="text-[#A451FF]">❯</span> Compiling Unity3D (C++)... <span className="text-[#00F26B]">OK</span></p>
                  <p className="text-slate-300"><span className="text-[#A451FF]">❯</span> Executing Curiosity... <span className="text-[#00F26B] animate-pulse">Running</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-[#00F26B]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00F26B]">Gênese Tecnológica</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-6">
              Curiosidade como <span className="text-[#A451FF]">Motor.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              A inspiração pela tecnologia e desenvolvimento de software vem desde criança. A curiosidade insaciável em saber como as coisas funcionam por dentro, criar algo novo e inovador, resolver problemas usando tecnologia, sempre com um pensamento ímpar.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              Com apenas <strong>12 anos</strong>, comecei a programar plugins para servidores de Minecraft 1.7.2 usando linguagem Java/Lua e IDE Eclipse, além de desenvolver jogos com C++ no Unity 3D. Ali nascia o engenheiro, antes mesmo do diploma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FOUNDER PROFILE SECTION ---
const FounderProfile = () => {
  return (
    <section className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0E0E0E] border border-white/5 rounded-[40px] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#A451FF]/5 to-[#00F26B]/5" />

          <div className="flex flex-col lg:flex-row relative z-10">
            {/* Left: Image & Stats */}
            <div className="w-full lg:w-1/3 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col items-center text-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl mb-8 group">
                <div className="absolute inset-0 bg-[#A451FF]/10 mix-blend-overlay group-hover:bg-transparent transition-all z-10" />
                <Image
                  src="/1767834710412.jpg"
                  alt="Hugo Alves"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
              </div>

              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Hugo Alves</h3>
              <p className="text-[#00F26B] font-mono text-sm tracking-widest uppercase mb-6">Founder & Tech Lead</p>

              <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
                <MapPin size={16} /> Jandaia Goiás, Brasil
              </div>

              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/hugoinsider/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#0077B5] hover:text-white transition-all text-slate-400">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/hugoinsider" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all text-slate-400">
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Right: Bio & Experience */}
            <div className="w-full lg:w-2/3 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-5 h-5 text-[#A451FF]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A451FF]">Liderança Técnica</span>
              </div>

              <div className="space-y-6 text-slate-400 leading-relaxed mb-10">
                <p>
                  Com uma trajetória na tecnologia iniciada de forma autodidata em <strong className="text-white">2013</strong>, construí uma carreira pautada pela evolução técnica acelerada e pela entrega de soluções robustas. Minha progressão reflete esse comprometimento: atuei como Desenvolvedor Júnior em 2018, Pleno em 2020 e consolidei minha senioridade como Sênior em 2022.
                </p>
                <p>
                  Evoluí de bases sólidas em sistemas críticos (ERP, migração de dados e lógica em PHP/Pascal) para o domínio especializado do ecossistema moderno de alta performance: <span className="text-white">Node.js, React.js, TypeScript e Python</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-[#00F26B]/20 transition-colors">
                  <h4 className="text-white font-bold uppercase mb-2 flex items-center gap-2">
                    <Users size={16} className="text-[#00F26B]" /> Liderança
                  </h4>
                  <p className="text-sm text-slate-500">
                    Tech Lead com base em Scrum (cert. 2019). Coordenação de times e decisões arquiteturais estratégicas.
                  </p>
                </div>
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-[#A451FF]/20 transition-colors">
                  <h4 className="text-white font-bold uppercase mb-2 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#A451FF]" /> Enterprise
                  </h4>
                  <p className="text-sm text-slate-500">
                    Bagagem em Fintech (TNP Bank) e E-commerce (Codeby/VTEX), focando em segurança e alta escala.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Tecnologias Core</h4>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "React.js", "TypeScript", "Python", "IA Generativa", "Scrum", "Arquitetura de Sistemas"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00F26B]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- GOVERNANCE SECTION ---
const GovernanceSection = () => {
  const items = [
    { title: "Privacidade", icon: Shield, href: "/privacidade", desc: "Como protegemos seus dados." },
    { title: "Termos de Uso", icon: Scale, href: "/termos", desc: "Regras e acordos comerciais." },
    { title: "Valores", icon: Diamond, href: "/valores", desc: "Nosso manifesto ético." },
  ];

  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="w-5 h-5 text-[#A451FF]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A451FF]">Compliance & Cultura</span>
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Transparência</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-auto">
            {items.map((item) => (
              <Link key={item.title} href={item.href} className="group bg-[#0E0E0E] border border-white/5 p-6 rounded-2xl hover:border-[#00F26B]/30 transition-all flex items-center gap-4 min-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B] group-hover:bg-[#00F26B] group-hover:text-black transition-colors">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-slate-500 ml-auto group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FAQ SECTION ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questions = [
    { q: "Quais tecnologias de IA vocês utilizam?", a: "Trabalhamos com o estado da arte: OpenAI (GPT-4), Claude 3, Gemini, além de frameworks open-source como Llama e Mistral via Ollama/HuggingFace." },
    { q: "Vocês criam SaaS do zero?", a: "Sim. Oferecemos o serviço de 'SaaS Factory', onde desenhamos, desenvolvemos e lançamos seu produto (MVP) pronto para receber assinantes." },
    { q: "Como funciona a IA para Ecommerce?", a: "Implementamos recomendação personalizada, busca inteligente (vetorial) e atendimento automatizado que entende contexto de vendas." },
  ];

  return (
    <section className="py-24 bg-[#050505]/80 relative px-6 z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black uppercase text-white mb-10 text-center">Base de <span className="text-[#A451FF]">Conhecimento</span></h2>
        <div className="space-y-4">
          {questions.map((item, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl bg-[#0E0E0E] overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors">
                <span className="text-sm font-bold uppercase text-slate-300">{item.q}</span>
                <ChevronDown className={`text-[#00F26B] transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-white/5 mt-2">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CONTACT SECTION ---
// --- CONTACT SECTION (COM INTEGRAÇÃO GOOGLE SHEETS) ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      // Chama a nossa API criada no Passo 3
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpa o form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto bg-[#0E0E0E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10">
        <div className="bg-[#151515] px-4 py-3 border-b border-white/5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="ml-4 text-[10px] text-slate-500 font-mono">root@hoffby-server:~/contact</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 border-r border-white/5 bg-white/[0.01]">
            <h3 className="text-2xl font-black uppercase text-white mb-6">Inicializar Contato</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#A451FF]/10 flex items-center justify-center text-[#A451FF]"><Mail size={18} /></div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Email</div>
                  <div className="text-white text-sm">contato@hoffby.com.br</div>
                </div>
              </div>
              <a href="https://wa.me/5564992263914" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-lg -ml-2 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B] group-hover:bg-[#00F26B] group-hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-[#00F26B] transition-colors">Whatsapp</div>
                  <div className="text-white text-sm group-hover:text-[#00F26B] transition-colors">+55 (64) 99226-3914</div>
                </div>
              </a>
            </div>

            <div className="mt-12 font-mono text-xs">
              <p className="text-slate-500 mb-2">{'// System Status:'}</p>
              {status === 'idle' && <span className="text-slate-400 animate-pulse">Waiting for user input...</span>}
              {status === 'loading' && <span className="text-[#A451FF]">Establishing secure connection...</span>}
              {status === 'success' && <span className="text-[#00F26B]">Data packet sent to Hoffby DB.</span>}
              {status === 'error' && <span className="text-red-500">Connection failed. Try again.</span>}
            </div>
          </div>

          <div className="p-10 font-mono relative">

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-[#0E0E0E]/95 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm"
                >
                  <div className="w-16 h-16 bg-[#00F26B]/10 rounded-full flex items-center justify-center text-[#00F26B] mb-4 border border-[#00F26B]/20">
                    <CheckSquare size={32} />
                  </div>
                  <h4 className="text-xl font-black uppercase text-white mb-2">Mensagem Recebida</h4>
                  <p className="text-slate-400 text-sm mb-6">Seus dados já estão no nosso sistema. Entraremos em contato em breve.</p>
                  <button onClick={() => setStatus('idle')} className="text-xs font-bold text-[#A451FF] hover:text-white transition-colors uppercase tracking-widest border-b border-[#A451FF] pb-1">Enviar Novo Comando</button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#A451FF] text-xs mb-2">$ input_name:</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors placeholder:text-slate-700" placeholder="Seu Nome_" />
              </div>
              <div>
                <label className="block text-[#A451FF] text-xs mb-2">$ input_email:</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors placeholder:text-slate-700" placeholder="seu@email.com_" />
              </div>
              <div>
                <label className="block text-[#A451FF] text-xs mb-2">$ input_message:</label>
                <textarea rows={3} name="message" required value={formData.message} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors resize-none placeholder:text-slate-700" placeholder="// Digite sua mensagem..." />
              </div>

              <p className="text-[10px] text-slate-500 mt-4 mb-2">
                Ao executar o envio do contato você aceita os nossos <Link href="/termos" className="text-[#A451FF] hover:underline">termos de uso</Link> e está ciente de nossos <Link href="/valores" className="text-[#A451FF] hover:underline">valores e princípios</Link>.
              </p>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4 rounded-lg ${status === 'loading' ? 'bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-white text-black hover:bg-[#00F26B]'}`}
              >
                {status === 'loading' ? 'Processing...' : <><Send size={14} /> Executar Envio</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER PREMIUM ---
const Footer = () => {
  return (
    <footer className="relative bg-[#020202] pt-32 pb-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <Logo className="w-20 h-20 mb-6" />
            {/* <p className="text-white font-black uppercase tracking-tighter text-lg leading-none mb-4">
              Hoffby<span className="text-[#A451FF]">.Tec</span>
            </p> */}
            <p className="text-xs text-slate-500 font-mono mb-6 max-w-[200px]">
              Arquitetura Digital de Alta Precisão & Inteligência Artificial.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/hugoinsider" target="_blank" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="https://github.com/hugoinsider" target="_blank" className="text-slate-500 hover:text-white transition-colors"><Github size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navegação</h4>
            <ul className="space-y-4">
              {['Soluções', 'Cases', 'Processo', 'Legado', 'Contato'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Legal & Ética</h4>
            <ul className="space-y-4">
              <li><Link href="/privacidade" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Termos de Uso</Link></li>
              <li><Link href="/valores" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Valores & Princípios</Link></li>
              <li><Link href="/inspiracao" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Inspirações</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Ferramentas</h4>
            <ul className="space-y-4">
              <li><Link href="/ferramentas" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Hub de Ferramentas</Link></li>
              <li><Link href="/ferramentas/gerador-de-senha" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Gerador de Senha</Link></li>
              <li><Link href="/ferramentas/gerador-qrcode" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">Gerador QR Code</Link></li>
              <li><Link href="/ferramentas/dns-checker" className="text-slate-500 text-sm hover:text-[#00F26B] transition-colors">DNS Checker</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Member Access</h4>
            <div className="p-6 bg-[#0E0E0E] border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00F26B] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Status: Online</span>
              </div>
              <p className="text-[10px] text-slate-600 mb-4">
                Acesso restrito para clientes com contratos ativos de suporte e manutenção.
              </p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2">
                <Lock size={12} /> Área do Cliente
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            © 2026 Hoffby Tecnologia Ltda • CNPJ: 44.532.586/0001-00
            <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>
            All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#A451FF]" />
            <span className="text-[10px] text-slate-600 font-mono">EST. 2020</span>
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#A451FF] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F26B] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function HoffbyPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-slate-50 selection:bg-[#A451FF] selection:text-white font-sans overflow-x-hidden relative">
      <IdentityBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AIPowerhouse />
        <Cases /> {/* Nova sessão inserida aqui */}
        <SolutionsBento />
        <Process />
        <About />
        <TechRoots />
        <FounderProfile />
        <GovernanceSection />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}