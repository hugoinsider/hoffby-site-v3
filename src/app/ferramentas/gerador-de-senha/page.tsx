'use client';

import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Key, ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function PasswordGeneratorPage() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState(0);

    const generatePassword = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let retVal = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
        calculateStrength(retVal);
        setCopied(false);
    };

    const calculateStrength = (pass: string) => {
        let score = 0;
        if (pass.length > 8) score++;
        if (pass.length > 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        setStrength(Math.min(score, 5));
    };

    useEffect(() => {
        generatePassword();
    }, [length, options]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white flex flex-col">
            <div className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#00F26B]/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#A451FF]/10 blur-[150px] rounded-full" />
                </div>

                <div className="max-w-xl w-full relative z-10">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <Logo className="w-16 h-16 md:w-20 md:h-20" />
                        </div>
                        <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                            ← Voltar para Ferramentas
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F26B]/20 bg-[#00F26B]/5 mb-6 backdrop-blur-md">
                            <Key size={12} className="text-[#00F26B]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">
                                Security First
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                            Gerador de <span className="text-[#00F26B]">Senha.</span>
                        </h1>
                        <p className="text-slate-400 text-sm">Crie chaves de acesso com entropia militar.</p>
                    </div>

                    <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-2xl relative overflow-hidden">

                        {/* Display */}
                        <div className="relative mb-8">
                            <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden group">
                                <input
                                    type="text"
                                    value={password}
                                    readOnly
                                    className="bg-transparent text-2xl md:text-3xl font-mono text-white w-full outline-none tracking-wider"
                                />
                                <button onClick={copyToClipboard} className="p-3 bg-white/5 hover:bg-[#00F26B] hover:text-black rounded-xl transition-all ml-4">
                                    {copied ? <ShieldCheck size={20} /> : <Copy size={20} />}
                                </button>
                                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-[#00F26B] transition-all duration-500" style={{ width: `${(strength / 5) * 100}%` }} />
                            </div>
                            <div className="flex justify-between items-center mt-2 px-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Força da Senha</span>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${strength === 5 ? 'text-[#00F26B]' : strength > 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {strength === 5 ? 'Impenetrável' : strength > 2 ? 'Forte' : 'Fraca'}
                                </span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white">Comprimento: {length}</label>
                                </div>
                                <input
                                    type="range"
                                    min="8"
                                    max="64"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00F26B]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(options).map((key) => (
                                    <label key={key} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-[#A451FF]/50 transition-all select-none">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${options[key as keyof typeof options] ? 'bg-[#A451FF] border-[#A451FF] text-white' : 'border-slate-600 bg-transparent'}`}>
                                            {options[key as keyof typeof options] && <Lock size={12} />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={options[key as keyof typeof options]}
                                            onChange={() => setOptions({ ...options, [key]: !options[key as keyof typeof options] })}
                                            className="hidden"
                                        />
                                        <span className="text-xs font-bold uppercase text-slate-300">
                                            {key === 'uppercase' ? 'Maiúsculas' : key === 'lowercase' ? 'Minúsculas' : key === 'numbers' ? 'Números' : 'Símbolos'}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <button onClick={generatePassword} className="w-full py-4 bg-[#00F26B] hover:bg-[#00c957] text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,107,0.3)] hover:shadow-[0_0_30px_rgba(0,242,107,0.5)]">
                                <RefreshCw size={18} /> Gerar Nova Senha
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
