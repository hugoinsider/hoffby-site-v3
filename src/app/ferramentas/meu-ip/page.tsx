'use client';

import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Server, Shield, Wifi, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

interface IpData {
    ip: string;
    city?: string;
    region?: string;
    country_name?: string;
    org?: string;
    asn?: string;
    timezone?: string;
    latitude?: number;
    longitude?: number;
}

export default function MyIpPage() {
    const [data, setData] = useState<IpData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchIp = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch('https://ipapi.co/json/');
            if (!res.ok) throw new Error('Failed to fetch');
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(true);
            // Fallback for just IP if detailed API fails
            try {
                const res2 = await fetch('https://api.ipify.org?format=json');
                const json2 = await res2.json();
                setData({ ip: json2.ip });
            } catch {
                setData(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIp();
    }, []);

    const InfoCard = ({ icon: Icon, label, value, color = "#A451FF" }: any) => (
        <div className="bg-[#0E0E0E] border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center`} style={{ color }}>
                <Icon size={24} />
            </div>
            <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</div>
                <div className="text-white font-mono text-sm md:text-base break-all">
                    {loading ? <span className="animate-pulse bg-white/10 text-transparent rounded">Loading...</span> : (value || 'N/A')}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#A451FF]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#00F26B]/5 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-5xl w-full relative z-10 my-20">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F26B]/20 bg-[#00F26B]/5 mb-6 backdrop-blur-md">
                        <Globe size={12} className="text-[#00F26B]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">Network Diagnostic</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Meu <span className="text-[#00F26B]">Endereço IP.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Visualize informações detalhadas sobre sua conexão atual.</p>
                </div>

                {/* MAIN IP DISPLAY */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-[#0E0E0E] border border-white/5 rounded-[40px] p-8 md:p-12 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00F26B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Seu IP Público IPv4</div>
                            <div className="text-4xl md:text-6xl font-black text-white font-mono tracking-tighter mb-8 break-all">
                                {loading ? <span className="animate-pulse">Loading...</span> : (data?.ip || 'Unavailable')}
                            </div>

                            <button
                                onClick={fetchIp}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F26B] hover:bg-[#00c957] text-black font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,107,0.3)] hover:shadow-[0_0_30px_rgba(0,242,107,0.5)] text-xs"
                            >
                                <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Atualizar Dados
                            </button>
                        </div>
                    </div>
                </div>

                {/* GRID DETAILS */}
                {!loading && data && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InfoCard icon={MapPin} label="Localização" value={`${data.city || ''}, ${data.region || ''} - ${data.country_name || ''}`} color="#A451FF" />
                        <InfoCard icon={Server} label="Provedor (ISP)" value={data.org} color="#00F26B" />
                        <InfoCard icon={Shield} label="ASN" value={data.asn} color="#FFD700" />
                        <InfoCard icon={Wifi} label="Fuso Horário" value={data.timezone} color="#FF0055" />
                        <InfoCard icon={MapPin} label="Coordenadas" value={`${data.latitude}, ${data.longitude}`} color="#00CCFF" />
                    </div>
                )}
            </div>
        </div>
    );
}
