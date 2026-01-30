'use client';

import React, { useState } from 'react';
import { Binary, ArrowRightLeft, Copy, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function BinaryTranslatorPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'toBinary' | 'toText'>('toBinary');
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        try {
            if (mode === 'toBinary') {
                setOutput(
                    input.split('')
                        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
                        .join(' ')
                );
            } else {
                const binary = input.replace(/\s+/g, '');
                if (!/^[01]+$/.test(binary)) {
                    setOutput('Error: Invalid Binary (0s and 1s only)');
                    return;
                }
                const text = [];
                for (let i = 0; i < binary.length; i += 8) {
                    const byte = binary.slice(i, i + 8);
                    text.push(String.fromCharCode(parseInt(byte, 2)));
                }
                setOutput(text.join(''));
            }
        } catch (e) {
            setOutput('Error: Conversion Failed');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="max-w-4xl w-full relative z-10 my-10 md:my-20">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Tradutor <span className="text-[#00F26B]">Binário.</span>
                    </h1>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-center mb-8 gap-4">
                        <button
                            onClick={() => setMode('toBinary')}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${mode === 'toBinary' ? 'bg-[#00F26B] border-[#00F26B] text-black' : 'border-white/10 text-slate-500 hover:bg-white/5'}`}
                        >
                            TXT → 0101
                        </button>
                        <button
                            onClick={() => setMode('toText')}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${mode === 'toText' ? 'bg-[#00F26B] border-[#00F26B] text-black' : 'border-white/10 text-slate-500 hover:bg-white/5'}`}
                        >
                            0101 → TXT
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
                                className="w-full h-64 bg-[#050505] border border-white/10 rounded-xl p-4 text-sm font-mono text-slate-300 focus:border-[#00F26B] outline-none resize-none"
                                placeholder={mode === 'toBinary' ? "Digite texto normal..." : "Digite 00101010..."}
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
                            className="px-12 py-4 bg-[#00F26B] hover:bg-[#00c957] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,107,0.3)] hover:shadow-[0_0_30px_rgba(0,242,107,0.5)] flex items-center gap-2"
                        >
                            <Binary size={18} /> Traduzir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
