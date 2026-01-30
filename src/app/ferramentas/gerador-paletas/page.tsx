'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, RefreshCw, Copy, Check, Download, Palette, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import chroma from 'chroma-js';

interface ColorState {
    hex: string;
    locked: boolean;
}

export default function PaletteGeneratorPage() {
    const [colors, setColors] = useState<ColorState[]>([]);
    const [copyFeedback, setCopyFeedback] = useState<number | null>(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
    const [showExport, setShowExport] = useState(false);

    // Initial Generation
    useEffect(() => {
        generatePalette(true);
    }, []);

    // Spacebar Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                generatePalette();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [colors]);

    const generatePalette = (forceAll = false) => {
        setColors(prev => {
            // If empty (first run), generate 5 random ones
            if (prev.length === 0 || forceAll) {
                return Array.from({ length: 5 }).map(() => ({
                    hex: chroma.random().hex(),
                    locked: false
                }));
            }

            // Generate new colors only for unlocked slots
            return prev.map(c => {
                if (c.locked) return c;
                return { ...c, hex: chroma.random().hex() };
            });
        });
    };

    const toggleLock = (index: number) => {
        setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c));
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopyFeedback(index);
        setTimeout(() => setCopyFeedback(null), 1000);
    };

    const getContrastColor = (hex: string) => {
        return chroma.contrast(hex, 'white') > 4.5 ? 'white' : 'black';
    };

    const exportJSON = () => {
        const data = colors.map(c => ({
            hex: c.hex,
            rgb: chroma(c.hex).css(),
            hsl: chroma(c.hex).css('hsl')
        }));
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert('Paleta copiada em JSON!');
    };

    // Color Details Modal Content
    const ColorDetails = ({ color }: { color: string }) => {
        const c = chroma(color);
        const formats = [
            { label: 'HEX', val: c.hex() },
            { label: 'RGB', val: c.css() },
            { label: 'HSL', val: c.css('hsl') },
            { label: 'CMYK', val: `cmyk(${c.cmyk().map(n => Math.round(n * 100) + '%').join(', ')})` },
            { label: 'LAB', val: `lab(${c.lab().map(n => Math.round(n)).join(', ')})` },
        ];

        return (
            <div className="flex flex-col gap-4">
                {formats.map((fmt, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase">{fmt.label}</div>
                            <div className="font-mono text-white select-all">{fmt.val}</div>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(fmt.val);
                                // Simple toast or feedback here
                            }}
                            className="text-slate-500 group-hover:text-white"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-[#050505] h-screen font-sans flex flex-col overflow-hidden text-slate-300">
            {/* TOP BAR */}
            <div className="h-16 border-b border-white/5 bg-[#0E0E0E] flex items-center justify-between px-6 z-20 sticky top-0">
                <div className="flex items-center gap-4">
                    <Logo className="w-8 h-8" />
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                        <ChevronDown className="rotate-90" size={16} /> Voltar
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-600 bg-white/5 px-2 py-1 rounded border border-white/5">Espaço</span>
                    <span className="text-xs text-slate-500">para gerar novas cores</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={exportJSON} className="flex items-center gap-2 px-4 py-2 bg-[#A451FF]/10 text-[#A451FF] hover:bg-[#A451FF] hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all">
                        <Download size={14} /> JSON
                    </button>
                    <button onClick={() => generatePalette()} className="flex items-center gap-2 px-4 py-2 bg-[#00F26B] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#00c957] transition-all">
                        <RefreshCw size={14} /> Gerar
                    </button>
                </div>
            </div>

            {/* COLUMNS */}
            <div className="flex-1 flex flex-col md:flex-row h-full relative">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="flex-1 relative group transition-all duration-300 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-white/5 last:border-0"
                        style={{ backgroundColor: color.hex }}
                    >
                        <div className="flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                            <button
                                onClick={() => toggleLock(index)}
                                className="p-3 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition-all shadow-lg"
                                style={{ color: getContrastColor(color.hex) }}
                            >
                                {color.locked ? <Lock size={20} /> : <Unlock size={20} />}
                            </button>

                            <button
                                onClick={() => copyToClipboard(color.hex, index)}
                                className="font-black text-2xl uppercase tracking-wider font-mono hover:scale-110 transition-transform cursor-pointer"
                                style={{ color: getContrastColor(color.hex) }}
                            >
                                {copyFeedback === index ? <Check size={32} /> : color.hex.replace('#', '')}
                            </button>

                            <button
                                onClick={() => setSelectedColorIndex(index)}
                                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-black/10 rounded border border-black/5 hover:bg-black/20 transition-all"
                                style={{ color: getContrastColor(color.hex), borderColor: getContrastColor(color.hex) }}
                            >
                                Ver Detalhes
                            </button>
                        </div>

                        {/* Always visible lock icon if locked */}
                        {color.locked && (
                            <div className="absolute top-4 right-4 text-black/20">
                                <Lock size={16} style={{ color: getContrastColor(color.hex) }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* DETAILS MODAL */}
            {selectedColorIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#0E0E0E] w-full max-w-lg rounded-[30px] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="h-24 w-full relative" style={{ backgroundColor: colors[selectedColorIndex].hex }}>
                            <button
                                onClick={() => setSelectedColorIndex(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-black uppercase italic text-white mb-6">Conversões</h3>
                            <ColorDetails color={colors[selectedColorIndex].hex} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
