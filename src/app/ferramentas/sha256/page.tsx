'use client';

import React, { useState, useEffect } from 'react';
import { Fingerprint, Copy, Check, Hash } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function Sha256GeneratorPage() {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const generateHash = async () => {
            if (!input) {
                setHash('');
                return;
            }
            const msgBuffer = new TextEncoder().encode(input);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setHash(hashHex);
        };
        generateHash();
    }, [input]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-4xl w-full relative z-10 my-10 md:my-20">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
                        <Fingerprint size={12} className="text-blue-500" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">Secure Hashing</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        SHA256 <span className="text-blue-500">Generator.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Geração de hash em tempo real usando Web Crypto API.</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-2xl space-y-8">

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Entrada de Texto</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={4}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500 outline-none transition-colors font-mono resize-none"
                            placeholder="Digite algo para gerar o hash..."
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute -top-3 left-4 px-2 bg-[#0E0E0E] text-[10px] font-bold uppercase tracking-widest text-blue-500">
                            SHA-256 Output
                        </div>
                        <div className="bg-[#050505] border border-blue-500/20 rounded-xl p-6 font-mono text-sm text-slate-300 break-all leading-relaxed flex items-center justify-between gap-4">
                            {hash || <span className="text-slate-700 italic">...</span>}
                            {hash && (
                                <button onClick={copyToClipboard} className="p-2 bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg transition-colors flex-shrink-0">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
