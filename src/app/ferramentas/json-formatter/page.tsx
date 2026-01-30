'use client';

import React, { useState } from 'react';
import { FileJson, AlignLeft, Minimize2, Copy, Check, AlertTriangle, Braces } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function JsonFormatterPage() {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-[#A451FF]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-[#00F26B]/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-6xl w-full relative z-10 my-20 h-[80vh] flex flex-col">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4 backdrop-blur-md">
                        <Braces size={12} className="text-[#00F26B]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">Structure Clean</span>
                    </div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        JSON <span className="text-[#00F26B]">Formatter.</span>
                    </h1>
                </div>

                <div className="flex-grow bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 shadow-2xl flex flex-col relative overflow-hidden">
                    {/* TOOLBAR */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                            <button onClick={formatJson} className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-[#A451FF] hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                                <AlignLeft size={14} /> Beautify
                            </button>
                            <button onClick={minifyJson} className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-[#A451FF] hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                                <Minimize2 size={14} /> Minify
                            </button>
                        </div>
                        <button onClick={copyToClipboard} className="flex items-center gap-2 px-6 py-2 bg-[#00F26B]/10 hover:bg-[#00F26B] hover:text-black text-[#00F26B] rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy JSON'}
                        </button>
                    </div>

                    {/* EDITOR AREA */}
                    <div className="flex-grow relative rounded-xl overflow-hidden border border-white/10 bg-[#050505]">
                        <textarea
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(null); }}
                            className="w-full h-full bg-transparent p-6 font-mono text-sm text-slate-300 outline-none resize-none leading-relaxed"
                            placeholder='Paste your JSON here... {"foo": "bar"}'
                            spellCheck={false}
                        />

                        {/* ERROR TOAST */}
                        {error && (
                            <div className="absolute bottom-6 left-6 right-6 bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-500 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
                                <AlertTriangle size={18} />
                                <span className="text-xs font-mono font-bold line-clamp-1">{error}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex justify-between text-[10px] uppercase font-bold text-slate-600">
                        <span>Lines: {input.split('\n').length}</span>
                        <span>Length: {input.length} chars</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
