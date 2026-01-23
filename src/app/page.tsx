'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, ChevronDown, ShoppingBag, 
  Cpu, Code2, BarChart3, Terminal, History, Bike, 
  Send, Mail, Phone, Rocket, Lock, 
  Bot, Layers, Gamepad2, Sparkles, Megaphone, 
  BrainCircuit, Database, Workflow, Box,
  CreditCard, Stethoscope, Users, CalendarCheck
} from 'lucide-react';

// --- CORES & CONSTANTES ---
const brand = {
  purple: '#A451FF',
  green: '#00F26B',
  bg: '#050505',
};

// --- LOGOTIPO VETORIAL HOFFBY ---
const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A451FF" />
        <stop offset="100%" stopColor="#00F26B" />
      </linearGradient>
    </defs>
    <path d="M20 10 L20 90 M80 10 L80 90 M20 50 L80 50" stroke="url(#logoGradient)" strokeWidth="12" strokeLinecap="round" />
    <circle cx="20" cy="10" r="6" fill="#A451FF" />
    <circle cx="80" cy="90" r="6" fill="#00F26B" />
  </svg>
);

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
      <div className={`max-w-7xl mx-auto px-6 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md rounded-full border border-white/5 py-3 shadow-2xl' : ''} flex justify-between items-center transition-all`}>
        <a href="#" className="flex items-center gap-3 group">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-black italic tracking-tighter text-white group-hover:text-[#00F26B] transition-colors">
            HOFFBY<span className="text-[#A451FF]">.TEC</span>
          </span>
        </a>
        <div className="hidden md:flex gap-8">
          {['Soluções', 'Cases', 'SaaS Factory', 'Legado', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00F26B] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00F26B] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,107,0.4)]">
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
            O Futuro é <br />
            <GradientText from="from-[#A451FF]" to="to-[#00F26B]">Artificial.</GradientText>
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
        <motion.div className="lg:col-span-5 relative hidden lg:block" style={{ y: y2 }}>
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
                Projetos que <br/><span className="text-white border-b-4 border-[#A451FF]">Transformaram</span>.
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
                <button className="px-6 py-2 bg-[#A451FF] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-colors">
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
            Do Asfalto <br/>
            ao <span className="text-[#00F26B]">Algoritmo.</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              O nome <strong>Hoffby</strong> carrega a precisão e a destreza de <span className="text-white">Bruno Hoffmann</span> e a adrenalina das pistas de BMX ({'"'}Hoffbmx{'"'}).
            </p>
            <p className="pl-6 border-l-2 border-[#00F26B] bg-gradient-to-r from-[#00F26B]/5 to-transparent py-4">
              <span className="text-white italic">{'"'}Representamos a intersecção da tradição e da modernidade.{'"'}</span>
            </p>
            <p>
              Fundada em meio aos desafios da pandemia, transformamos aquela paixão inabalável do esporte em energia para resolver problemas complexos de T.I.
            </p>
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
                        <span className="text-sm font-bold text-white">Destino: Hoffby Tech</span>
                        <span className="text-[9px] text-slate-500">CURRENT_VERSION</span>
                   </div>
                </div>
             </div>
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
const Contact = () => {
  const [email, setEmail] = useState('');
  
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
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B]"><Phone size={18} /></div>
                 <div>
                   <div className="text-[10px] uppercase font-bold text-slate-500">Whatsapp</div>
                   <div className="text-white text-sm">+55 (64) 99226-3914</div>
                 </div>
               </div>
            </div>
          </div>
          <div className="p-10 font-mono">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-[#A451FF] text-xs mb-2">$ input_name:</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors" placeholder="Seu Nome_" />
              </div>
              <div>
                <label className="block text-[#A451FF] text-xs mb-2">$ input_email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors" placeholder="seu@email.com_" />
              </div>
              <div>
                <label className="block text-[#A451FF] text-xs mb-2">$ input_message:</label>
                <textarea rows={3} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors resize-none" placeholder="// Digite sua mensagem..." />
              </div>
              <button className="w-full bg-white text-black py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#00F26B] transition-colors flex items-center justify-center gap-2 mt-4 rounded-lg">
                <Send size={14} /> Executar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-[#020202] relative z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2 opacity-80 hover:opacity-100 transition-opacity">
                 <Logo className="w-6 h-6" />
                <span className="text-sm font-black italic tracking-tighter text-white">HOFFBY</span>
            </div>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">© 2026 Hoffby Tecnologia Ltda</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.03] border border-white/5">
                <Lock className="w-3 h-3 text-[#A451FF]" />
                <span className="text-[10px] font-mono text-slate-400">CNPJ: 44.532.586/0001-00</span>
            </div>
            <div className="flex gap-4 text-[9px] font-bold uppercase text-slate-600 mt-2">
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
        </div>
    </div>
  </footer>
);

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
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}