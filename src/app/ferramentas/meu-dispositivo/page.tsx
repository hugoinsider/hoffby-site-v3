'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Cpu, Chrome, Globe, Layout } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function MyDevicePage() {
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        // Simple User Agent Parsing (Client Side Only)
        const ua = navigator.userAgent;
        let browser = "Unknown";
        let os = "Unknown";
        let device = "Desktop";

        // Browser Detection
        if (ua.indexOf("Firefox") > -1) browser = "Mozilla Firefox";
        else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
        else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
        else if (ua.indexOf("Trident") > -1) browser = "Microsoft Internet Explorer";
        else if (ua.indexOf("Edge") > -1) browser = "Microsoft Edge";
        else if (ua.indexOf("Chrome") > -1) browser = "Google Chrome";
        else if (ua.indexOf("Safari") > -1) browser = "Apple Safari";

        // OS Detection
        if (ua.indexOf("Win") > -1) os = "Windows";
        else if (ua.indexOf("Mac") > -1) os = "MacOS";
        else if (ua.indexOf("Linux") > -1) os = "Linux";
        else if (ua.indexOf("Android") > -1) os = "Android";
        else if (ua.indexOf("like Mac") > -1) os = "iOS";

        // Device Detection
        if (/Mobi|Android/i.test(ua)) device = "Mobile";

        setInfo({
            userAgent: ua,
            browser,
            os,
            device,
            screen: `${window.screen.width} x ${window.screen.height}`,
            depth: `${window.screen.colorDepth}-bit`,
            cores: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Logical Cores` : 'Unknown',
            memory: (navigator as any).deviceMemory ? `~${(navigator as any).deviceMemory} GB` : 'Unknown',
            language: navigator.language,
            cookies: navigator.cookieEnabled ? "Enabled" : "Disabled"
        });
    }, []);

    const InfoCard = ({ icon: Icon, label, value, color = "#A451FF", full = false }: any) => (
        <div className={`bg-[#0E0E0E] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors ${full ? 'md:col-span-2 lg:col-span-3' : ''}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center`} style={{ color }}>
                    <Icon size={24} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</div>
            </div>
            <div className={`${full ? 'font-mono text-xs text-slate-400 break-all' : 'text-2xl font-bold text-white tracking-tight'}`}>
                {value || 'Loading...'}
            </div>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#A451FF]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00F26B]/5 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-5xl w-full relative z-10 my-20">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#A451FF]/20 bg-[#A451FF]/5 mb-6 backdrop-blur-md">
                        <Smartphone size={12} className="text-[#A451FF]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A451FF]">System Info</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Meu <span className="text-[#A451FF]">Dispositivo.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Informações de hardware e software extraídas do seu navegador.</p>
                </div>

                {info && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InfoCard icon={Chrome} label="Navegador" value={info.browser} color="#00F26B" />
                        <InfoCard icon={Layout} label="Sistema Operacional" value={info.os} color="#A451FF" />
                        <InfoCard icon={info.device === 'Mobile' ? Smartphone : Monitor} label="Tipo de Dispositivo" value={info.device} color="#FFD700" />

                        <InfoCard icon={Monitor} label="Resolução de Tela" value={info.screen} color="#00CCFF" />
                        <InfoCard icon={Cpu} label="CPU Cores" value={info.cores} color="#FF0055" />
                        <InfoCard icon={Globe} label="Idioma" value={info.language} color="#FFA500" />

                        <InfoCard icon={Cpu} label="User Agent String" value={info.userAgent} color="#888888" full={true} />
                    </div>
                )}
            </div>
        </div>
    );
}
