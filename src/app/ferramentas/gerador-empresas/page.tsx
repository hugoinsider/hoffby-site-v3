'use client';

import React, { useState, useEffect } from 'react';
import { Building2, RefreshCw, Copy, Check, MapPin, Phone, Hash, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

// --- GENERATOR UTILS ---
const companyPrefixes = ['Tech', 'Global', 'Prime', 'Alpha', 'Mega', 'Ultra', 'Star', 'Blue', 'Red', 'Green', 'Fast', 'Smart'];
const companySuffixes = ['Solutions', 'Systems', 'Logistics', 'Consulting', 'Services', 'Holding', 'Group', 'Enterprises', 'Industries', 'Technologies'];
const companyTypes = ['Ltda', 'S.A.', 'ME', 'EPP'];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (arr: string[]) => arr[randomInt(0, arr.length - 1)];

const generateCNPJ = (formatted: boolean) => {
    const n = () => randomInt(0, 9);
    const n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(); // Root
    const n9 = 0, n10 = 0, n11 = 0, n12 = 1; // Suffix 0001

    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;

    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;

    if (formatted) return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
};

const generateCompany = () => {
    const name = `${randomItem(companyPrefixes)} ${randomItem(companySuffixes)} ${randomItem(companyTypes)}`;
    const date = new Date(randomInt(2000, 2023), randomInt(0, 11), randomInt(1, 28)).toLocaleDateString('pt-BR');

    return {
        name: name,
        cnpj: generateCNPJ(true),
        ie: `${randomInt(100, 999)}.${randomInt(100, 999)}.${randomInt(100, 999)}`,
        phone: `(11) 3${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}-${randomInt(1000, 9999)}`,
        openingDate: date,
        address: `Av. Empresarial, ${randomInt(100, 5000)} - Torre ${randomItem(['A', 'B', 'C'])}`
    };
};

export default function CompanyGeneratorPage() {
    const [company, setCompany] = useState<ReturnType<typeof generateCompany> | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
        setCompany(generateCompany());
    }, []);

    const handleGenerate = () => setCompany(generateCompany());

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const Field = ({ label, value, icon: Icon, id }: any) => (
        <div className="bg-[#050505] p-4 rounded-xl border border-white/5 relative group hover:border-[#00F26B]/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
                <Icon size={14} className="text-[#00F26B]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-mono text-white text-lg truncate pr-4">{value}</span>
                <button
                    onClick={() => copyToClipboard(value, id)}
                    className="p-2 bg-white/5 hover:bg-[#A451FF] hover:text-white rounded-lg transition-colors"
                >
                    {copiedField === id ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-[#00F26B]/5 blur-[120px] rounded-full pointer-events-none" />
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
                        <Building2 size={12} className="text-[#00F26B]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">Corp Generator</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Gerador de <span className="text-[#00F26B]">Empresas.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Dados corporativos fictícios para testes B2B e validação de sistemas.</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                    {company ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="md:col-span-2">
                                <Field label="Razão Social" value={company.name} icon={Building2} id="name" />
                            </div>
                            <Field label="CNPJ" value={company.cnpj} icon={Hash} id="cnpj" />
                            <Field label="Inscrição Estadual" value={company.ie} icon={Hash} id="ie" />
                            <Field label="Telefone Comercial" value={company.phone} icon={Phone} id="phone" />
                            <Field label="Data de Abertura" value={company.openingDate} icon={Calendar} id="date" />
                            <div className="md:col-span-2">
                                <Field label="Endereço Comercial" value={company.address} icon={MapPin} id="address" />
                            </div>
                        </div>
                    ) : <div className="p-12 text-center text-slate-500 animate-pulse">Inicializando gerador de empresas...</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleGenerate}
                            className="w-full py-4 bg-[#00F26B] hover:bg-[#00c957] text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,107,0.3)] hover:shadow-[0_0_30px_rgba(0,242,107,0.5)]"
                        >
                            <RefreshCw size={18} /> Gerar Nova Empresa
                        </button>
                        <button
                            onClick={() => copyToClipboard(JSON.stringify(company, null, 2), 'json')}
                            className="w-full py-4 bg-[#0E0E0E] text-white font-black uppercase tracking-widest rounded-xl border border-white/5 hover:border-[#A451FF] hover:text-[#A451FF] transition-all flex items-center justify-center gap-2"
                        >
                            {copiedField === 'json' ? <Check size={18} /> : <div className="font-mono text-sm">{`{ }`}</div>} Copiar JSON
                        </button>
                    </div>
                </div>

                <p className="text-center text-[10px] text-slate-600 mt-6 uppercase tracking-widest">
                    * CNPJs gerados são matematicamente válidos mas não pertencem a empresas reais.
                </p>
            </div>
        </div>
    );
}
