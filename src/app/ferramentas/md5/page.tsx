'use client';

import React, { useState } from 'react';
import { Fingerprint, Copy, Check, Hash } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import CryptoJS from 'crypto-js';

export default function MD5Page() {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCalculate = () => {
        // MD5 is a legacy hash, but still useful for checksums
        if (!input) return;
        const result = CryptoJS.MD5(input).toString();
        setHash(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] right-[30%] w-[30vw] h-[30vw] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-3xl w-full relative z-10 my-10 md:my-20">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Gerador <span className="text-red-500">MD5.</span>
                    </h1>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mt-2">Legacy Message-Digest Algorithm 5</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-2xl">
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Texto para Hash</label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={(e) => handleCalculate()}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-500 outline-none transition-colors font-mono text-sm"
                            placeholder="Digite algo..."
                        />
                    </div>

                    <div className="bg-[#050505] p-6 rounded-xl border border-white/5 relative group hover:border-red-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <Hash size={12} className="text-red-500" /> Hash Result
                            </div>
                            {hash && (
                                <button onClick={copyToClipboard} className="text-xs text-red-500 hover:text-white flex items-center gap-1 transition-colors">
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            )}
                        </div>
                        <div className="font-mono text-xl md:text-2xl text-white break-all tracking-tight min-h-[2rem]">
                            {hash || <span className="text-slate-700 select-none">...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
