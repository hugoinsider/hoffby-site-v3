'use client';

import React, { useState } from 'react';
import { User, RefreshCw, Copy, Check, MapPin, Mail, CreditCard, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

// --- GENERATOR UTILS ---
const firstNames = ['Miguel', 'Arthur', 'Gael', 'Heitor', 'Helena', 'Alice', 'Laura', 'Maria', 'João', 'Pedro', 'Lucas', 'Enzo', 'Valentina', 'Sophia', 'Isabella', 'Gabriel', 'Bernardo'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida'];
const cities = ['São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Curitiba - PR', 'Salvador - BA', 'Brasília - DF', 'Fortaleza - CE', 'Recife - PE', 'Porto Alegre - RS'];
const streets = ['Rua das Flores', 'Avenida Paulista', 'Rua XV de Novembro', 'Avenida Brasil', 'Rua São João', 'Rua da Paz', 'Avenida Central', 'Travessa da Alegria'];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (arr: string[]) => arr[randomInt(0, arr.length - 1)];

const generateCPF = (formatted: boolean) => {
    const n = () => randomInt(0, 9);
    const n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(), n9 = n();
    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;
    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;

    if (formatted) return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
};

const generateRG = () => `${randomInt(10, 99)}.${randomInt(100, 999)}.${randomInt(100, 999)}-${randomInt(0, 9)}`;

const generatePerson = () => {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames) + ' ' + randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.split(' ')[0].toLowerCase()}${randomInt(1, 999)}@gmail.com`;
    const birthDate = new Date(randomInt(1960, 2005), randomInt(0, 11), randomInt(1, 28)).toLocaleDateString('pt-BR');

    return {
        name: fullName,
        cpf: generateCPF(true),
        rg: generateRG(),
        email: email,
        birthDate: birthDate,
        city: randomItem(cities),
        address: `${randomItem(streets)}, ${randomInt(10, 2000)}`
    };
};

export default function PersonGeneratorPage() {
    const [person, setPerson] = useState(generatePerson());
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleGenerate = () => setPerson(generatePerson());

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
                <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-[#A451FF]/5 blur-[120px] rounded-full pointer-events-none" />
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
                        <User size={12} className="text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Data Mocking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Gerador de <span className="text-[#A451FF]">Pessoas.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Dados fictícios válidos para testes de software e preenchimento de formulários.</p>
                </div>

                <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="md:col-span-2">
                            <Field label="Nome Completo" value={person.name} icon={User} id="name" />
                        </div>
                        <Field label="CPF" value={person.cpf} icon={CreditCard} id="cpf" />
                        <Field label="RG" value={person.rg} icon={CreditCard} id="rg" />
                        <Field label="E-mail" value={person.email} icon={Mail} id="email" />
                        <Field label="Data Nascimento" value={person.birthDate} icon={Calendar} id="birth" />
                        <Field label="Cidade / Estado" value={person.city} icon={MapPin} id="city" />
                        <Field label="Endereço" value={person.address} icon={MapPin} id="address" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleGenerate}
                            className="w-full py-4 bg-[#A451FF] hover:bg-[#8e3ee0] text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(164,81,255,0.3)] hover:shadow-[0_0_30px_rgba(164,81,255,0.5)]"
                        >
                            <RefreshCw size={18} /> Gerar Nova Identidade
                        </button>
                        <button
                            onClick={() => copyToClipboard(JSON.stringify(person, null, 2), 'json')}
                            className="w-full py-4 bg-[#0E0E0E] text-white font-black uppercase tracking-widest rounded-xl border border-white/5 hover:border-[#00F26B] hover:text-[#00F26B] transition-all flex items-center justify-center gap-2"
                        >
                            {copiedField === 'json' ? <Check size={18} /> : <div className="font-mono text-sm">{`{ }`}</div>} Copiar JSON
                        </button>
                    </div>
                </div>

                <p className="text-center text-[10px] text-slate-600 mt-6 uppercase tracking-widest">
                    * Dados gerados algoritmicamente. Qualquer semelhança com pessoas reais é mera coincidência.
                </p>
            </div>
        </div>
    );
}
