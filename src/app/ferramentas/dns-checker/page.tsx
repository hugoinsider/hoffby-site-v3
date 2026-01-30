'use client';

import React, { useState } from 'react';
import { Globe, Search, Server, CheckCircle2, XCircle, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

type DnsRecord = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'TXT';

interface DnsResult {
    provider: string;
    location: string;
    status: 'loading' | 'success' | 'error';
    data?: string[];
}

export default function DnsCheckerPage() {
    const [domain, setDomain] = useState('');
    const [recordType, setRecordType] = useState<DnsRecord>('A');
    const [results, setResults] = useState<DnsResult[]>([
        { provider: 'Google DNS', location: 'Global (Anycast)', status: 'success', data: ['Waiting for input...'] },
        { provider: 'Cloudflare', location: 'Global (Anycast)', status: 'success', data: ['Waiting for input...'] },
        { provider: 'Quad9', location: 'Zürich, Switzerland', status: 'success', data: ['Waiting for input...'] },
    ]);
    const [loading, setLoading] = useState(false);

    const checkDns = async () => {
        if (!domain) return;
        setLoading(true);

        // Reset results to loading
        setResults(prev => prev.map(r => ({ ...r, status: 'loading', data: [] })));

        // Define resolvers
        const resolvers = [
            { id: 0, url: `https://dns.google/resolve?name=${domain}&type=${recordType}`, type: 'google' },
            { id: 1, url: `https://cloudflare-dns.com/dns-query?name=${domain}&type=${recordType}`, type: 'cloudflare' },
            { id: 2, url: `https://dns.quad9.net/dns-query?name=${domain}&type=${recordType}`, type: 'quad9' }
        ];

        // Fetch concurrently
        await Promise.all(resolvers.map(async (resolver) => {
            try {
                const response = await fetch(resolver.url, {
                    headers: { 'Accept': 'application/dns-json' }
                });
                const data = await response.json();

                let answers: string[] = [];
                if (data.Answer) {
                    answers = data.Answer.map((a: any) => a.data);
                } else if (data.Authority) {
                    answers = data.Authority.map((a: any) => `SOA: ${a.data}`);
                } else {
                    answers = ['No records found'];
                }

                setResults(prev => prev.map((r, idx) =>
                    idx === resolver.id ? { ...r, status: 'success', data: answers } : r
                ));

            } catch (error) {
                setResults(prev => prev.map((r, idx) =>
                    idx === resolver.id ? { ...r, status: 'error', data: ['Connection Failed'] } : r
                ));
            }
        }));

        setLoading(false);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white flex flex-col">
            <div className="flex-grow flex flex-col items-center p-6 relative overflow-hidden my-10 md:my-20">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[80vw] h-[50vw] bg-blue-500/10 blur-[150px] rounded-full" />
                </div>

                <div className="max-w-6xl w-full relative z-10">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <Logo className="w-16 h-16 md:w-20 md:h-20" />
                        </div>
                        <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                            ← Voltar para Ferramentas
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6 backdrop-blur-md">
                            <Globe size={12} className="text-blue-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">
                                Global Propagation
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                            DNS <span className="text-blue-500">Checker.</span>
                        </h1>
                        <p className="text-slate-400 text-sm">Verifique a propagação de seus domínios em tempo real.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* CONTROLS */}
                        <div className="lg:col-span-3 bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-grow w-full relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition-colors font-mono"
                                    placeholder="google.com"
                                    onKeyDown={(e) => e.key === 'Enter' && checkDns()}
                                />
                            </div>
                            <div className="w-full md:w-auto">
                                <select
                                    value={recordType}
                                    onChange={(e) => setRecordType(e.target.value as DnsRecord)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500 outline-none cursor-pointer appearance-none font-bold text-center"
                                >
                                    {['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT'].map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <button onClick={checkDns} disabled={loading} className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Verifying...' : <><Globe size={18} /> Check</>}
                            </button>
                        </div>

                        {/* RESULTS LIST */}
                        <div className="lg:col-span-2 space-y-4">
                            {results.map((res, i) => (
                                <div key={i} className="bg-[#0E0E0E] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-4 min-w-[200px]">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${res.status === 'success' ? 'bg-green-500/10 text-green-500' : res.status === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                            <Server size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{res.provider}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{res.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex-grow w-full">
                                        {res.status === 'loading' ? (
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-1/3 bg-blue-500 animate-pulse rounded-full" />
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                {res.data?.map((r, idx) => (
                                                    <div key={idx} className="font-mono text-xs text-slate-300 bg-[#050505] px-3 py-1.5 rounded border border-white/5 break-all">
                                                        {r}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-[40px] flex justify-end">
                                        {res.status === 'success' && <CheckCircle2 className="text-green-500" size={20} />}
                                        {res.status === 'error' && <XCircle className="text-red-500" size={20} />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PREMIUM FEATURES / IDEAS */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0E0E0E] border border-white/10 rounded-[30px] p-8 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#A451FF]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6 text-[#A451FF]">
                                        <Lock size={18} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Funcionalidades Pro</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-white italic uppercase mb-4">Leve sua infraestrutura para o próximo nível.</h3>

                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Monitoramento 24/7 de Propagação",
                                            "Alertas via WhatsApp/Slack",
                                            "Histórico de Alterações de DNS",
                                            "Relatórios White-label (PDF)",
                                            "API Access para Developers"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                                <CheckCircle2 size={16} className="text-[#00F26B] shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="w-full py-3 bg-[#A451FF] hover:bg-[#902bf5] text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg text-xs">
                                        Entrar na Lista de Espera
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
