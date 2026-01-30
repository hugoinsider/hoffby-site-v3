'use client';

import React, { useState } from 'react';
import { Lock, RefreshCw, CheckCircle2, XCircle, Hash, Shield } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import bcrypt from 'bcryptjs';

export default function BcryptGeneratorPage() {
    const [mode, setMode] = useState<'encrypt' | 'verify'>('encrypt');
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [rounds, setRounds] = useState(10);
    const [result, setResult] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEncrypt = async () => {
        if (!input) return;
        setLoading(true);
        // Add small delay to allow UI update
        setTimeout(() => {
            const salt = bcrypt.genSaltSync(rounds);
            const newHash = bcrypt.hashSync(input, salt);
            setHash(newHash);
            setLoading(false);
        }, 100);
    };

    const handleVerify = () => {
        if (!input || !hash) return;
        setLoading(true);
        setTimeout(() => {
            const isMatch = bcrypt.compareSync(input, hash);
            setResult(isMatch);
            setLoading(false);
        }, 100);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-[#A451FF]/5 blur-[120px] rounded-full pointer-events-none" />
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
                        <Lock size={12} className="text-[#A451FF]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A451FF]">Crypto Util</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Bcrypt <span className="text-[#A451FF]">Generator.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Geração de hash e verificação segura usando bcryptjs.</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">

                    {/* TABS */}
                    <div className="flex bg-[#050505] p-1 rounded-xl mb-8 border border-white/5 w-fit mx-auto">
                        <button
                            onClick={() => { setMode('encrypt'); setInput(''); setHash(''); setResult(null); }}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === 'encrypt' ? 'bg-[#A451FF] text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                            Encrypt
                        </button>
                        <button
                            onClick={() => { setMode('verify'); setInput(''); setHash(''); setResult(null); }}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${mode === 'verify' ? 'bg-[#A451FF] text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                            Verify
                        </button>
                    </div>

                    <div className="space-y-6">
                        {mode === 'encrypt' ? (
                            <>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Texto para Criptografar</label>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[#A451FF] outline-none transition-colors font-mono"
                                        placeholder="MinhaSenhaSecreta123"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Salt Rounds: {rounds}</label>
                                    <input
                                        type="range"
                                        min="8" max="14"
                                        value={rounds}
                                        onChange={(e) => setRounds(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#A451FF]"
                                    />
                                </div>
                                <button onClick={handleEncrypt} disabled={loading} className="w-full py-4 bg-[#A451FF] hover:bg-[#8e3ee0] text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                                    {loading ? 'Processing...' : <><Lock size={18} /> Generate Hash</>}
                                </button>
                                {hash && (
                                    <div className="mt-6 bg-[#050505] p-6 rounded-2xl border border-[#A451FF]/30 relative group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#A451FF] mb-2 block">Bcrypt Hash</label>
                                        <p className="font-mono text-xs text-slate-300 break-all">{hash}</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Texto Plano</label>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => { setInput(e.target.value); setResult(null); }}
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[#A451FF] outline-none transition-colors font-mono"
                                        placeholder="Senha original"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Hash Bcrypt</label>
                                    <input
                                        type="text"
                                        value={hash}
                                        onChange={(e) => { setHash(e.target.value); setResult(null); }}
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-[#A451FF] outline-none transition-colors font-mono"
                                        placeholder="$2a$10$..."
                                    />
                                </div>
                                <button onClick={handleVerify} disabled={loading} className="w-full py-4 bg-[#A451FF] hover:bg-[#8e3ee0] text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                                    {loading ? 'Verifying...' : <><Shield size={18} /> Verify Match</>}
                                </button>
                                {result !== null && (
                                    <div className={`mt-6 p-6 rounded-2xl border flex items-center gap-4 ${result ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                                        {result ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                        <span className="font-bold uppercase tracking-wider">{result ? 'Match Verified' : 'No Match'}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
