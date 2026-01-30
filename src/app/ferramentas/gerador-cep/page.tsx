'use client';

import React, { useState, useEffect } from 'react';
import { Map, RefreshCw, Copy, Check, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

// --- GENERATOR UTILS ---
const regions = [
    { range: [1000, 19999], state: 'São Paulo (Capital/RMSP)', uf: 'SP' },
    { range: [20000, 28999], state: 'Rio de Janeiro', uf: 'RJ' },
    { range: [30000, 39999], state: 'Minas Gerais', uf: 'MG' },
    { range: [40000, 48999], state: 'Bahia', uf: 'BA' },
    { range: [50000, 56999], state: 'Pernambuco', uf: 'PE' },
    { range: [60000, 63999], state: 'Ceará', uf: 'CE' },
    { range: [70000, 72999], state: 'Distrito Federal', uf: 'DF' },
    { range: [80000, 87999], state: 'Paraná', uf: 'PR' },
    { range: [90000, 99999], state: 'Rio Grande do Sul', uf: 'RS' },
];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (arr: any[]) => arr[randomInt(0, arr.length - 1)];

const generateCEP = () => {
    const region = randomItem(regions);
    const prefix = randomInt(region.range[0], region.range[1]);
    const suffix = randomInt(0, 999).toString().padStart(3, '0');

    return {
        code: `${prefix}-${suffix}`,
        state: region.state,
        uf: region.uf,
        street: 'Rua Gerada Aleatoriamente',
        district: `Bairro Simulado ${randomInt(1, 20)}`
    };
};

export default function CepGeneratorPage() {
    const [cep, setCep] = useState<ReturnType<typeof generateCEP> | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
        setCep(generateCEP());
    }, []);

    const handleGenerate = () => setCep(generateCEP());

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const Field = ({ label, value, icon: Icon, id }: any) => (
        <div className="bg-[#050505] p-4 rounded-xl border border-white/5 relative group hover:border-[#A451FF]/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
                <Icon size={14} className="text-[#A451FF]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-mono text-white text-lg truncate pr-4">{value}</span>
                <button
                    onClick={() => copyToClipboard(value, id)}
                    className="p-2 bg-white/5 hover:bg-[#00F26B] hover:text-black rounded-lg transition-colors"
                >
                    {copiedField === id ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#A451FF]/5 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-2xl w-full relative z-10 my-20">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
                        <Map size={12} className="text-[#A451FF]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A451FF]">Geo Mocking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Gerador de <span className="text-[#A451FF]">CEP.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Códigos postais válidos por região para testes de entrega e cadastro.</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                    {cep ? (
                        <div className="flex flex-col gap-6 mb-8">
                            <div className="bg-[#050505] p-8 rounded-2xl border border-white/10 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">CEP Gerado</span>
                                    <span className="text-4xl font-mono text-white tracking-widest">{cep.code}</span>
                                </div>
                                <button onClick={() => copyToClipboard(cep.code, 'main-cep')} className="p-4 bg-white/5 hover:bg-[#00F26B] hover:text-black rounded-xl transition-all">
                                    {copiedField === 'main-cep' ? <Check size={24} /> : <Copy size={24} />}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Estado (UF)" value={`${cep.state} (${cep.uf})`} icon={MapPin} id="uf" />
                                <Field label="Bairro Fictício" value={cep.district} icon={Navigation} id="district" />
                                <div className="md:col-span-2">
                                    <Field label="Logradouro" value={cep.street} icon={MapPin} id="street" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-500 animate-pulse">Carregando gerador...</div>
                    )}

                    <button
                        onClick={handleGenerate}
                        className="w-full py-4 bg-[#A451FF] hover:bg-[#8e3ee0] text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(164,81,255,0.3)] hover:shadow-[0_0_30px_rgba(164,81,255,0.5)]"
                    >
                        <RefreshCw size={18} /> Gerar Novo CEP
                    </button>
                </div>
            </div>
        </div>
    );
}
