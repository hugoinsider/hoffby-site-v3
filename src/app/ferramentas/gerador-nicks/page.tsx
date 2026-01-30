'use client';

import React, { useState } from 'react';
import { Gamepad2, RefreshCw, Copy, Check, Hash, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

// --- GENERATOR UTILS ---
const prefixes = ['Neo', 'Cyber', 'Dark', 'Night', 'Shadow', 'Iron', 'Golden', 'Silver', 'Toxic', 'Radio', 'Hyper', 'Mega', 'Ultra', 'Pro', 'God', 'Master', 'Elite', 'Rogue', 'Ninja'];
const nouns = ['Wolf', 'Ghost', 'Stalker', 'Sniper', 'Gamer', 'Coder', 'Hacker', 'Falcon', 'Dragon', 'Tiger', 'Viper', 'Phantom', 'Soldier', 'Knight', 'King', 'Slayer', 'Hunter', 'Reaper'];
const suffixes = ['X', '007', '99', 'BR', 'PT', '_Official', 'TV', 'Live', 'Plays', 'Gaming', 'Tech', 'Dev', 'Ops'];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (arr: string[]) => arr[randomInt(0, arr.length - 1)];

const leetSpeak = (text: string) => {
    return text
        .replace(/a/gi, '4')
        .replace(/e/gi, '3')
        .replace(/i/gi, '1')
        .replace(/o/gi, '0')
        .replace(/s/gi, '5')
        .replace(/t/gi, '7');
};

const generateNick = (style: 'clean' | 'leet' | 'random') => {
    const base = `${randomItem(prefixes)}${randomItem(nouns)}`;

    if (style === 'clean') return base;
    if (style === 'leet') return leetSpeak(base);

    // Random style
    const types = [
        () => `${base}${randomInt(10, 99)}`,
        () => `${base}_${randomItem(suffixes)}`,
        () => `xX_${base}_Xx`,
        () => `[${randomItem(prefixes).toUpperCase()}] ${base}`,
        () => leetSpeak(base) + randomInt(1, 9)
    ];
    return types[randomInt(0, types.length - 1)]();
};

export default function NickGeneratorPage() {
    const [style, setStyle] = useState<'clean' | 'leet' | 'random'>('random');
    const [nicks, setNicks] = useState<string[]>(Array(6).fill('').map(() => generateNick('random')));
    const [copiedField, setCopiedField] = useState<number | null>(null);

    const handleGenerate = () => {
        setNicks(Array(6).fill('').map(() => generateNick(style)));
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedField(index);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-[#00F26B]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#A451FF]/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-4xl w-full relative z-10 my-20">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
                        <Gamepad2 size={12} className="text-[#00F26B]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">Gamer Identity</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Gerador de <span className="text-[#00F26B]">Nicks.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Identidades únicas para jogos, redes sociais e comunidades.</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">

                    {/* Style Selection */}
                    <div className="flex justify-center gap-4 mb-10">
                        {['clean', 'leet', 'random'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setStyle(s as any)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${style === s ? 'bg-white text-black' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {nicks.map((nick, idx) => (
                            <div key={idx} className="bg-[#050505] p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-[#00F26B]/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00F26B]/50 group-hover:text-[#00F26B] transition-colors">
                                        <Hash size={16} />
                                    </div>
                                    <span className="font-mono text-white text-lg tracking-wide">{nick}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(nick, idx)}
                                    className="p-3 bg-white/5 hover:bg-[#00F26B] hover:text-black rounded-xl transition-colors"
                                >
                                    {copiedField === idx ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="w-full py-4 bg-[#00F26B] hover:bg-[#00c957] text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,107,0.3)] hover:shadow-[0_0_30px_rgba(0,242,107,0.5)]"
                    >
                        <RefreshCw size={18} /> Gerar Novos Nicks
                    </button>
                </div>
            </div>
        </div>
    );
}
