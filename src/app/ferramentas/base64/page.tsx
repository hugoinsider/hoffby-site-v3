'use client';

import React, { useState } from 'react';
import { Type, ArrowRightLeft, Copy, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function Base64Page() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        try {
            if (mode === 'encode') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            setOutput('Error: Invalid Input');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-[#A451FF]/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-4xl w-full relative z-10 my-20">
                <div className="text-center mb-10">
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Base64 <span className="text-[#A451FF]">Converter.</span>
                    </h1>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-center mb-8 gap-4">
                        <button
                            onClick={() => setMode('encode')}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${mode === 'encode' ? 'bg-[#A451FF] border-[#A451FF] text-white' : 'border-white/10 text-slate-500 hover:bg-white/5'}`}
                        >
                            Text → Base64
                        </button>
                        <button
                            onClick={() => setMode('decode')}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${mode === 'decode' ? 'bg-[#00F26B] border-[#00F26B] text-black' : 'border-white/10 text-slate-500 hover:bg-white/5'}`}
                        >
                            Base64 → Text
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Input</label>
                                <button onClick={() => { setInput(''); setOutput('') }} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1"><Trash2 size={12} /> Limpar</button>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-64 bg-[#050505] border border-white/10 rounded-xl p-4 text-sm font-mono text-slate-300 focus:border-[#A451FF] outline-none resize-none"
                                placeholder={mode === 'encode' ? "Digite o texto para codificar..." : "Cole o código Base64 para decodificar..."}
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-4 md:hidden">
                            <button onClick={handleConvert} className="w-full py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                <ArrowRightLeft className="mx-auto rotate-90 text-white" />
                            </button>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Output</label>
                                {output && (
                                    <button onClick={copyToClipboard} className="text-xs text-[#00F26B] hover:text-white flex items-center gap-1">
                                        {copied ? <Check size={12} /> : <Copy size={12} />} Copiar
                                    </button>
                                )}
                            </div>
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-64 bg-[#050505] border border-white/10 rounded-xl p-4 text-sm font-mono text-[#00F26B] focus:border-[#00F26B] outline-none resize-none"
                                placeholder="Resultado..."
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleConvert}
                            className="px-12 py-4 bg-[#A451FF] hover:bg-[#8e3ee0] text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(164,81,255,0.3)] hover:shadow-[0_0_30px_rgba(164,81,255,0.5)] flex items-center gap-2"
                        >
                            <ArrowRightLeft size={18} /> Converter Agora
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
