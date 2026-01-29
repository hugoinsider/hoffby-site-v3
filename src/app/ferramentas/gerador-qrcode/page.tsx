'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link as LinkIcon, Upload, Image as ImageIcon, Layers, Layout, X, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function QRCodeGeneratorPage() {
    const [text, setText] = useState('https://hoffby.com.br');
    const [size, setSize] = useState(1024); // High res for download logic
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');

    // Advanced Features
    const [logo, setLogo] = useState<string | null>(null);
    const [logoPosition, setLogoPosition] = useState<'center' | 'top'>('center');
    const [frame, setFrame] = useState<'none' | 'border' | 'scanme'>('none');

    const canvasRef = useRef<HTMLDivElement>(null);
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) setLogo(ev.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Composite Image Generation Logic
    const generateCompositeCanvas = async () => {
        const qrCanvas = canvasRef.current?.querySelector('canvas');
        if (!qrCanvas) return null;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Base Size Calculation
        const padding = frame !== 'none' ? 100 : 0;
        const topPadding = logoPosition === 'top' && logo ? 200 : 0;
        const bottomPadding = frame === 'scanme' ? 200 : 0;

        const finalWidth = size + (padding * 2);
        const finalHeight = size + (padding * 2) + topPadding + bottomPadding;

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        // 1. Draw Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        // 2. Draw Frame Border if active
        if (frame !== 'none') {
            ctx.strokeStyle = fgColor;
            ctx.lineWidth = 20;
            const radius = 60; // Rounded corners radius

            ctx.beginPath();
            ctx.roundRect(20, 20, finalWidth - 40, finalHeight - 40, radius);
            ctx.stroke();
        }

        // 3. Draw Logo Top if active (Proportional)
        if (logoPosition === 'top' && logo) {
            const img = new Image();
            img.src = logo;
            await new Promise((resolve) => { img.onload = resolve; });

            // Calculate Aspect Ratio
            const maxLogoSize = 150;
            const scale = Math.min(maxLogoSize / img.width, maxLogoSize / img.height);
            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;

            const logoX = (finalWidth - drawWidth) / 2;
            const logoY = 60 + (maxLogoSize - drawHeight) / 2; // Center vertically in top padding

            ctx.drawImage(img, logoX, logoY, drawWidth, drawHeight);
        }

        // 4. Draw QR Code
        const qrX = padding;
        const qrY = padding + topPadding;
        ctx.drawImage(qrCanvas, qrX, qrY, size, size);

        // 5. Draw "ESCANEIE-ME" text and Icon if active
        if (frame === 'scanme') {
            ctx.fillStyle = fgColor;

            // Draw Simple Scan Icon
            const iconSize = 60;
            const iconX = (finalWidth - iconSize) / 2;
            const iconY = finalHeight - 160;

            ctx.strokeStyle = fgColor;
            ctx.lineWidth = 6;
            ctx.strokeRect(iconX, iconY, iconSize, iconSize); // Outer box
            ctx.fillRect(iconX + 20, iconY + 20, 20, 20); // Inner dot

            // Draw Text
            ctx.font = '900 60px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("ESCANEIE-ME", finalWidth / 2, finalHeight - 50);
        }

        return canvas;
    };

    const downloadCode = async (format: 'png' | 'svg') => {
        if (format === 'svg') {
            alert('SVG download does not support composite frames/logos yet. Downloading raw QR SVG.');
            const svg = canvasRef.current?.querySelector('svg');
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg);
                const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qrcode-${Date.now()}.svg`;
                a.click();
            }
            return;
        }

        const compositeCanvas = await generateCompositeCanvas();
        if (compositeCanvas) {
            const url = compositeCanvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = `qrcode-composite-${Date.now()}.png`;
            a.click();
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white flex flex-col">
            <div className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden my-20">

                {/* HEADERS... (Keep existing headers) */}
                <div className="max-w-7xl w-full relative z-10">
                    <div className="text-center mb-10">
                        <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                            ← Voltar para Ferramentas
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                            Gerador <span className="text-[#A451FF]">QR Code Pro.</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* EDITOR */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* BASIC SETTINGS */}
                            <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                    <LinkIcon size={14} className="text-[#00F26B]" /> Conteúdo & Cores
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">URL / Texto</label>
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#A451FF] outline-none transition-colors font-mono text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Cor Frontal</label>
                                            <div className="flex items-center gap-2 bg-[#050505] border border-white/10 rounded-xl px-3 py-2">
                                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Cor Fundo</label>
                                            <div className="flex items-center gap-2 bg-[#050505] border border-white/10 rounded-xl px-3 py-2">
                                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* LOGO SETTINGS */}
                            <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                    <ImageIcon size={14} className="text-[#A451FF]" /> Logotipo
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block w-full cursor-pointer bg-[#050505] border border-dashed border-white/20 hover:border-[#A451FF] rounded-xl p-6 text-center transition-colors group">
                                            <Upload className="mx-auto mb-2 text-slate-500 group-hover:text-[#A451FF]" />
                                            <span className="text-xs font-bold text-slate-500 uppercase">Upload Imagem</span>
                                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                        </label>
                                    </div>
                                    {logo && (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4 bg-[#050505] p-2 rounded-xl border border-white/10">
                                                <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-lg bg-white/5" />
                                                <button onClick={() => setLogo(null)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg"><X size={16} /></button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setLogoPosition('center')}
                                                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${logoPosition === 'center' ? 'bg-[#A451FF] border-[#A451FF] text-white' : 'border-white/10 text-slate-500'}`}
                                                >
                                                    Centro
                                                </button>
                                                <button
                                                    onClick={() => setLogoPosition('top')}
                                                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${logoPosition === 'top' ? 'bg-[#A451FF] border-[#A451FF] text-white' : 'border-white/10 text-slate-500'}`}
                                                >
                                                    Topo
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* FRAME SETTINGS */}
                            <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-8 shadow-2xl">
                                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                    <Layout size={14} className="text-yellow-500" /> Molduras
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {['none', 'border', 'scanme'].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFrame(f as any)}
                                            className={`py-4 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all ${frame === f ? 'border-[#00F26B] bg-[#00F26B]/10 text-white' : 'border-white/5 bg-[#050505] text-slate-500 hover:border-white/20'}`}
                                        >
                                            {f === 'none' ? 'Nenhuma' : f === 'border' ? 'Borda' : 'Scan Me'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* PREVIEW AREA */}
                        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-10">
                            <div className="bg-white rounded-[30px] p-8 shadow-2xl flex items-center justify-center aspect-[3/4] relative group overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                                {/* LIVE PREVIEW CONTAINER */}
                                <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-300"
                                    style={{
                                        padding: frame !== 'none' ? '20px' : '0',
                                        border: frame !== 'none' ? `8px solid ${fgColor}` : 'none',
                                        borderRadius: frame !== 'none' ? '30px' : '0',
                                        background: bgColor
                                    }}>

                                    {/* Top Logo */}
                                    {logo && logoPosition === 'top' && (
                                        <img src={logo} className="w-16 h-16 object-contain mb-4" alt="Top Logo" />
                                    )}

                                    <div ref={canvasRef}>
                                        <QRCodeCanvas
                                            value={text}
                                            size={256}
                                            fgColor={fgColor}
                                            bgColor={frame === 'none' ? bgColor : 'transparent'} // Transparent if framed to blend
                                            level={level}
                                            includeMargin={frame === 'none'}
                                            imageSettings={logo && logoPosition === 'center' ? {
                                                src: logo,
                                                x: undefined,
                                                y: undefined,
                                                height: 48,
                                                width: 48,
                                                excavate: true,
                                            } : undefined}
                                        />
                                    </div>

                                    {/* Scan Me Text */}
                                    {frame === 'scanme' && (
                                        <div className="mt-4 flex flex-col items-center">
                                            <div className="mb-1">
                                                <QrCode size={24} style={{ color: fgColor }} />
                                            </div>
                                            <div className="text-xl font-black uppercase tracking-tighter" style={{ color: fgColor }}>
                                                ESCANEIE-ME
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button onClick={() => downloadCode('png')} className="w-full py-4 bg-[#00F26B] hover:bg-[#00c957] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,107,0.3)] hover:shadow-[0_0_30px_rgba(0,242,107,0.5)] flex items-center justify-center gap-2">
                                <Download size={18} /> Baixar QR Code (PNG)
                            </button>
                            <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
                                * SVG disponível apenas para QR Codes simples.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
