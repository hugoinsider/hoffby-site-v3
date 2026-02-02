"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
    Loader2, LogOut, Zap, Vote,
    ArrowRight, User, Building2, Layout,
    FileText, ClipboardList, Database, Briefcase,
    LucideIcon
} from 'lucide-react';
import Link from 'next/link';

// Icon mapping helper
const IconMap: Record<string, LucideIcon> = {
    User: User,
    Building2: Building2,
    CRM: Database,
    Kanban: Layout,
    OS: ClipboardList,
    NFE: FileText,
    SIGC: Briefcase
};

interface Tool {
    id: string;
    icon: string;
    status: string;
    title: string;
    description: string;
}

interface ToolsData {
    paid: Tool[];
}

export default function CustomerArea() {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ToolsData | null>(null);
    const [votingState, setVotingState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetch('/api/customer/tools')
            .then(res => res.json())
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    const handleVote = async (toolId: string) => {
        setVotingState(prev => ({ ...prev, [toolId]: true }));
        try {
            await fetch('/api/customer/vote', {
                method: 'POST',
                body: JSON.stringify({ toolId })
            });
            // Optimistic update would go here
        } finally {
            // Keep loading state or show success? Let's just mock success state
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="text-[#00F0FF] animate-spin" size={48} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed]">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#A451FF]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00F0FF]/5 blur-[120px] rounded-full" />
            </div>
            {/* Topbar Glassmorphic */}
            <header className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Logo / Brand */}
                        {/* <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black italic tracking-tighter text-xl rounded-lg">
                            H
                        </div> */}
                        <div className="flex flex-col">
                            {/* <span className="font-black uppercase tracking-tighter text-white leading-none">
                                Hoffby <span className="text-[#00F0FF]">Area</span>
                            </span> */}
                            <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                                Beta
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Authenticated As</div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                                <div className="text-xs font-bold text-white font-mono">{user?.email}</div>
                            </div>
                        </div>
                        <button onClick={logout} className="group flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">Logout</span>
                            <LogOut size={14} className="text-slate-500 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Welcome Section - Standard Site Typography */}
                <div className="mb-24 relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/5 mb-8 backdrop-blur-md">
                        <Zap size={10} className="text-[#00F0FF]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F0FF]">
                            Premium Dashboard
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-8">
                        Ferramentas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#00F0FF]">Exclusivas.</span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-xl leading-relaxed border-l-2 border-[#A451FF] pl-6 bg-gradient-to-r from-[#A451FF]/5 to-transparent py-4">
                        Bem-vindo ao seu hub de controle. Acesse ferramentas em beta, vote no roadmap e gerencie sua inteligência de negócios.
                    </p>
                </div>

                {/* Premium Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {data?.paid.map((tool) => {
                        const Icon = IconMap[tool.icon] || Zap;
                        return (
                            <div key={tool.id} className="group relative bg-[#0E0E0E] border border-white/5 rounded-[30px] p-10 overflow-hidden hover:border-[#CCFF00]/30 transition-all duration-500">
                                {/* Background Glow on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            {/* Icon */}
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/5 group-hover:bg-[#CCFF00] group-hover:text-black transition-colors duration-300">
                                                <Icon size={28} />
                                            </div>

                                            {/* Status Badge */}
                                            {tool.status === 'beta' ? (
                                                <div className="px-3 py-1 rounded-full border border-[#CCFF00]/20 bg-[#CCFF00]/5 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCFF00]">
                                                        Beta Open
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                                    Beta
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-black uppercase text-white mb-2">{tool.title}</h3>
                                        <p className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-4">
                                            {tool.status === 'beta' ? 'Acesso Liberado' : 'Em Desenvolvimento'}
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                            {tool.description}
                                        </p>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="pt-8 border-t border-white/5">
                                        {tool.status === 'beta' ? (
                                            <button className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:text-[#CCFF00] transition-colors">
                                                Acessar Ferramenta <ArrowRight size={14} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleVote(tool.id)}
                                                disabled={votingState[tool.id]}
                                                className="w-full flex items-center justify-between group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="text-slate-500 font-bold text-xs uppercase tracking-widest group-hover/btn:text-white transition-colors">
                                                    {votingState[tool.id] ? 'Interesse Registrado' : 'Tenho Interesse'}
                                                </span>
                                                {votingState[tool.id] ? (
                                                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
                                                        <span className="text-xs">✓</span>
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover/btn:bg-[#CCFF00] group-hover/btn:text-black transition-all">
                                                        <Vote size={14} />
                                                    </div>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Free Tools Hub Link */}
                <div className="bg-white/5 border border-white/10 p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <h2 className="text-2xl font-black uppercase mb-4">Precisa de ferramentas básicas?</h2>
                    <p className="text-white/50 mb-8">Acesse nosso hub gratuito com geradores de senha, CPF, QR Code e mais.</p>

                    <Link href="/ferramentas" className="inline-block border border-white text-white font-bold uppercase py-3 px-8 hover:bg-white hover:text-black transition-all">
                        Ir para Ferramentas Gratuitas
                    </Link>
                </div>

            </main>
        </div>
    );
}
