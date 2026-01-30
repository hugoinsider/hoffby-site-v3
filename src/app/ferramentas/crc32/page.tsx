'use client';

import React, { useState } from 'react';
import { Calculator, Copy, Check, FileCheck } from 'lucide-react';
import Link from 'next/link';
import CRC32 from 'crc-32';

export default function CRC32Page() {
    const [input, setInput] = useState('');
    const [checksum, setChecksum] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCalculate = () => {
        if (!input) {
            setChecksum('');
            return;
        }
        // Calculate CRC32 and convert to unsigned hex
        const code = CRC32.str(input);
        const hex = (code >>> 0).toString(16).toUpperCase();
        setChecksum(hex);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(checksum);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-3xl w-full relative z-10 my-20">
                <div className="text-center mb-10">
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Calculadora <span className="text-blue-500">CRC32.</span>
                    </h1>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mt-2">Cyclic Redundancy Check 32-bit</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Texto para Checksum</label>
                        <textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                // Direct calc on change for immediate feedback
                                const code = CRC32.str(e.target.value);
                                const hex = (code >>> 0).toString(16).toUpperCase();
                                setChecksum(e.target.value ? hex : '');
                            }}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500 outline-none transition-colors font-mono text-sm h-32 resize-none"
                            placeholder="Cole seu texto ou código aqui..."
                        />
                    </div>

                    <div className="bg-[#050505] p-6 rounded-xl border border-white/5 relative group hover:border-blue-500/30 transition-colors flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-1">
                                <FileCheck size={12} className="text-blue-500" /> Checksum (Hex)
                            </div>
                            <div className="font-mono text-3xl font-black text-white tracking-tight">
                                {checksum || <span className="text-slate-800">----</span>}
                            </div>
                        </div>
                        {checksum && (
                            <button onClick={copyToClipboard} className="p-4 bg-white/5 hover:bg-blue-500 hover:text-white rounded-xl transition-all">
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
