'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Code2 } from 'lucide-react';
import Link from 'next/link';
import jwt from 'jsonwebtoken';

function safeJsonParse(str: string) {
    try {
        return JSON.stringify(JSON.parse(str), null, 2);
    } catch {
        return str;
    }
}

export default function JwtDebuggerPage() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setHeader('');
            setPayload('');
            setIsValid(false);
            return;
        }

        try {
            const decoded = jwt.decode(token, { complete: true });
            if (decoded) {
                setHeader(JSON.stringify(decoded.header, null, 2));
                setPayload(JSON.stringify(decoded.payload, null, 2));
                setIsValid(true);
            } else {
                throw new Error('Invalid Token');
            }
        } catch {
            setHeader('Error decoding header');
            setPayload('Error decoding payload');
            setIsValid(false);
        }
    }, [token]);

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 w-full h-[400px] bg-gradient-to-b from-[#A451FF]/10 to-transparent pointer-events-none" />
            </div>

            <div className="max-w-6xl w-full relative z-10 my-20">
                <div className="text-center mb-10">
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
                        <Code2 size={12} className="text-[#A451FF]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A451FF]">Token Inspector</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        JWT <span className="text-[#A451FF]">Debugger.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Decodifique e inspecione tokens JWT com facilidade. (Client-side only)</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* INPUT SIDE */}
                    <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl h-full flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-between">
                            <span>Encoded Token</span>
                            {token && (
                                isValid ? (
                                    <span className="text-green-500 flex items-center gap-1"><ShieldCheck size={14} /> Valid Format</span>
                                ) : (
                                    <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={14} /> Invalid</span>
                                )
                            )}
                        </h3>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className={`w-full h-[400px] bg-[#050505] border rounded-xl p-4 font-mono text-sm outline-none resize-none transition-colors ${isValid ? 'border-[#A451FF] text-[#A451FF]' : 'border-white/10 text-slate-400'}`}
                            placeholder="Cole seu JWT aqui (eyJhbGciOi...)"
                        />
                    </div>

                    {/* OUTPUT SIDE */}
                    <div className="space-y-6">

                        {/* HEADER */}
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">Header</h3>
                            <pre className="font-mono text-xs text-slate-300 overflow-auto max-h-[150px]">
                                {header || <span className="text-slate-700">// Header data...</span>}
                            </pre>
                        </div>

                        {/* PAYLOAD */}
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#A451FF]" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A451FF] mb-4">Payload</h3>
                            <pre className="font-mono text-xs text-slate-300 overflow-auto max-h-[300px]">
                                {payload || <span className="text-slate-700">// Payload data...</span>}
                            </pre>
                        </div>

                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#00F26B]" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F26B] mb-4">Signature</h3>
                            <p className="font-mono text-xs text-slate-500">
                                HMACSHA256(
                                base64UrlEncode(header) + "." +
                                base64UrlEncode(payload),
                                secret)
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
