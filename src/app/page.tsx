'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, ChevronRight, ChevronDown, Zap, Shield, 
  Cpu, Globe, ShoppingCart, Code2, BarChart3, 
  Terminal, History, Bike, Send, MapPin, Mail, Phone, 
  CheckSquare, Square, Layers, Search, Rocket, Lock
} from 'lucide-react';

// --- CORES & CONSTANTES ---
const brand = {
  purple: '#A451FF',
  green: '#00F26B',
  bg: '#050505',
};

// --- COMPONENTE DE TEXTO COM GRADIENTE ---
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
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded bg-gradient-to-br from-[#A451FF] to-[#00F26B] flex items-center justify-center text-black font-black">
            H
          </div> */}
          <span className="text-xl font-black italic tracking-tighter text-white">HOFFBY</span>
        </div>
        
        <div className="hidden md:flex gap-8">
          {['Expertise', 'Processo', 'Legado', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00F26B] transition-colors">
          Iniciar Projeto <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.nav>
  );
};

// --- HERO SECTION ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#A451FF]/20 blur-[150px] rounded-full opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div className="lg:col-span-7" style={{ y: y1 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F26B]/20 bg-[#00F26B]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00F26B] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">
              System Online v2.0
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-8">
            O Código <br />
            da <GradientText from="from-[#A451FF]" to="to-[#00F26B]">Evolução</GradientText>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-10 border-l-2 border-white/10 pl-6">
            Não criamos apenas software. Arquitetamos ecossistemas digitais que unem a tradição humana à velocidade da automação.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-[#A451FF] text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-[#902bf5] transition-all shadow-[0_0_30px_rgba(164,81,255,0.3)] hover:shadow-[0_0_50px_rgba(164,81,255,0.5)]">
              Nossas Soluções
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/10 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white/5 transition-all">
              Ver Cases
            </button>
          </div>
        </motion.div>

        <motion.div className="lg:col-span-5 relative hidden lg:block" style={{ y: y2 }}>
          <div className="relative z-10 bg-gradient-to-b from-[#1a1a1a] to-[#050505] border border-white/10 rounded-[40px] p-8 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-all duration-700 group">
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
        </motion.div>
      </div>
    </section>
  );
};

// --- MARQUEE ---
const Marquee = () => {
  return (
    <div className="w-full py-10 border-y border-white/5 bg-[#080808] overflow-hidden flex relative z-20">
      <motion.div 
        className="flex gap-20 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {["REACT", "NEXT.JS", "NODE", "PYTHON", "AI INTEGRATION", "AUTOMATION", "DASHBOARDS", "UI/UX"].map((txt) => (
              <span key={txt} className="text-4xl font-black italic text-white/5 uppercase tracking-tighter">
                {txt}
              </span>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// --- SERVICES SECTION ---
const Services = () => {
  const services = [
    { title: "Automação Comercial", icon: ShoppingCart, desc: "Sistemas inteligentes que vendem por você.", color: brand.green },
    { title: "Dev Sob Medida", icon: Code2, desc: "Softwares arquitetados para sua regra de negócio.", color: brand.purple },
    { title: "Business Intelligence", icon: BarChart3, desc: "Dashboards visuais para decisões baseadas em dados.", color: brand.green },
    { title: "Consultoria Tech", icon: Shield, desc: "Análise de infraestrutura e segurança digital.", color: brand.purple },
  ];

  return (
    <section id="expertise" className="py-32 px-6 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
            Nosso <span className="text-[#A451FF]">Arsenal.</span>
          </h2>
          <div className="h-1 w-20 bg-[#00F26B]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="group relative h-[320px] rounded-[30px] bg-[#0E0E0E] border border-white/5 p-8 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-500">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${s.color}, transparent 70%)` }}
              />
              
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6" style={{ color: s.color }}>
                  <s.icon />
                </div>
                <h3 className="text-xl font-black uppercase italic text-white mb-4">{s.title}</h3>
                <p className="text-sm text-slate-400 font-medium">{s.desc}</p>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: s.color }}>Detalhes</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- [NOVO] PROCESS SECTION (METODOLOGIA) ---
const Process = () => {
  const steps = [
    { id: "01", title: "Imersão", icon: Search, desc: "Mergulhamos no seu negócio para entender a dor real." },
    { id: "02", title: "Arquitetura", icon: Layers, desc: "Desenhamos a solução técnica mais eficiente e escalável." },
    { id: "03", title: "Desenvolvimento", icon: Code2, desc: "Coding puro. Transformamos lógica em funcionalidades." },
    { id: "04", title: "Deploy & Scale", icon: Rocket, desc: "Lançamento seguro e monitoramento de crescimento." },
  ];

  return (
    <section id="processo" className="py-32 bg-[#080808] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
            <span className="text-[#00F26B] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Metodologia</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                Protocolo de <span className="text-white border-b-4 border-[#A451FF]">Execução</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Linha Conectora (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-[#A451FF] via-[#00F26B] to-[#A451FF] opacity-20" />

            {steps.map((step, idx) => (
                <div key={idx} className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-[#0E0E0E] border border-white/10 rounded-full flex items-center justify-center mb-8 relative group hover:border-[#00F26B] transition-colors">
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

// --- ABOUT SECTION (ORIGEM) ---
const About = () => {
  return (
    <section id="legado" className="py-32 bg-[#050505] relative overflow-hidden">
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
              O nome <strong>Hoffby</strong> carrega a precisão e a destreza de <span className="text-white">Bruno Hoffmann</span> e a adrenalina das pistas de BMX ("Hoffbmx").
            </p>
            <p className="pl-6 border-l-2 border-[#00F26B]">
              <span className="text-white italic">"Representamos a intersecção da tradição e da modernidade."</span>
            </p>
            <p>
              Fundada em meio aos desafios da pandemia, transformamos aquela paixão inabalável do esporte em energia para resolver problemas complexos de T.I.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/5">
             {[
               { val: "07", label: "Anos" },
               { val: "+226", label: "Projetos" },
               { val: "3k+", label: "Suportes" }
             ].map((st, i) => (
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
             <div className="space-y-2">
                <div className="flex gap-4 items-center p-3 bg-white/5 rounded-lg">
                   <Bike className="text-[#A451FF]" size={20} />
                   <span className="text-sm font-bold text-white">Origem: Hoffbmx</span>
                </div>
                <div className="flex justify-center py-2"><div className="w-px h-8 bg-white/10" /></div>
                <div className="flex gap-4 items-center p-3 bg-white/5 rounded-lg border border-[#00F26B]/30">
                   <Terminal className="text-[#00F26B]" size={20} />
                   <span className="text-sm font-bold text-white">Destino: Hoffby Tech</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- [NOVO] FAQ SECTION ---
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const questions = [
        { q: "Vocês atendem apenas grandes empresas?", a: "Não. Nossa arquitetura é escalável. Atendemos desde startups ambiciosas até corporações consolidadas que precisam modernizar seus sistemas." },
        { q: "Qual o prazo médio de um projeto?", a: "Varia conforme a complexidade. Um site institucional leva cerca de 15 dias, enquanto sistemas complexos (SaaS) podem levar de 2 a 4 meses." },
        { q: "Como funciona o suporte pós-lançamento?", a: "Oferecemos garantia de 30 dias para bugs e pacotes de manutenção mensal (SLA) para garantir que seu sistema continue operando a 100%." },
    ];

    return (
        <section className="py-24 bg-[#050505] relative px-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-black uppercase text-white mb-10 text-center">Base de <span className="text-[#A451FF]">Conhecimento</span></h2>
                <div className="space-y-4">
                    {questions.map((item, idx) => (
                        <div key={idx} className="border border-white/10 rounded-xl bg-[#0E0E0E] overflow-hidden">
                            <button 
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-sm font-bold uppercase text-slate-300">{item.q}</span>
                                <ChevronDown className={`text-[#00F26B] transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-white/5 mt-2">
                                            {item.a}
                                        </div>
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
    <section id="contato" className="py-32 px-6 relative bg-[#080808]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />

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
                 <div className="w-10 h-10 rounded-lg bg-[#A451FF]/10 flex items-center justify-center text-[#A451FF]">
                   <Mail size={18} />
                 </div>
                 <div>
                   <div className="text-[10px] uppercase font-bold text-slate-500">Email</div>
                   <div className="text-white text-sm">hoffby@hoffby.com.br</div>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B]">
                   <Phone size={18} />
                 </div>
                 <div>
                   <div className="text-[10px] uppercase font-bold text-slate-500">Whatsapp</div>
                   <div className="text-white text-sm">+55 (64) 99226-3914</div>
                 </div>
               </div>
            </div>
            <div className="mt-12">
               <p className="font-mono text-xs text-slate-500">waiting for command...</p>
               <div className="w-4 h-1 bg-[#00F26B] animate-pulse mt-1" />
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
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-[#A451FF] transition-colors" 
                  placeholder="seu@email.com_" 
                />
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

// --- FOOTER (COM CNPJ) ---
const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-[#020202]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                {/* <div className="w-4 h-4 rounded bg-[#A451FF] flex items-center justify-center text-[8px] text-black font-black">H</div> */}
                <span className="text-sm font-black italic tracking-tighter text-white">HOFFBY</span>
            </div>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Hoffby Tecnologia Ltda
            </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
             {/* CNPJ EM DESTAQUE SUTIL */}
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5">
                <Lock className="w-3 h-3 text-slate-500" />
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
    <div className="bg-[#050505] min-h-screen text-slate-50 selection:bg-[#A451FF] selection:text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee />
        <Services />
        <Process /> {/* Nova Sessão */}
        <About />
        <FAQ /> {/* Nova Sessão */}
        <Contact />
        <Footer />
      </div>
    </div>
  );
}