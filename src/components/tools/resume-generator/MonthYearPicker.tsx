
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface MonthYearPickerProps {
    value: string; // Format: "YYYY-MM"
    onChange: (value: string) => void;
    label?: string;
    disabled?: boolean;
}

const MONTHS = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export function MonthYearPicker({ value, onChange, label, disabled }: MonthYearPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(new Date().getFullYear());
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize viewYear from value if present
    useEffect(() => {
        if (value) {
            const [y] = value.split('-');
            if (y) setViewYear(parseInt(y));
        }
    }, [value]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMonthSelect = (monthIndex: number) => {
        const monthStr = (monthIndex + 1).toString().padStart(2, '0');
        onChange(`${viewYear}-${monthStr}`);
        setIsOpen(false);
    };

    const formatDisplay = (val: string) => {
        if (!val) return 'Selecione a data';
        const [y, m] = val.split('-');
        if (!m) return y; // Return just year if no month

        const monthIndex = parseInt(m) - 1;
        if (isNaN(monthIndex) || monthIndex < 0 || monthIndex >= 12) return val; // Fallback to raw value

        const monthName = MONTHS[monthIndex];
        return `${monthName} ${y}`;
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 ml-1">{label}</label>}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white flex items-center justify-between transition-all hover:border-emerald-500/30 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isOpen ? 'border-emerald-500/50 ring-1 ring-emerald-500/50' : ''}`}
            >
                <span className={`text-sm ${value ? 'text-white' : 'text-slate-500'}`}>
                    {value ? formatDisplay(value) : 'MM / AAAA'}
                </span>
                <CalendarIcon size={16} className="text-slate-500" />
            </button>

            {isOpen && (
                <div className="absolute top-[110%] left-0 z-50 w-64 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                        <button
                            type="button"
                            onClick={() => setViewYear(prev => prev - 1)}
                            className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="font-bold text-white text-lg font-mono">{viewYear}</span>
                        <button
                            type="button"
                            onClick={() => setViewYear(prev => prev + 1)}
                            className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {MONTHS.map((month, index) => {
                            const isSelected = value === `${viewYear}-${(index + 1).toString().padStart(2, '0')}`;
                            return (
                                <button
                                    key={month}
                                    type="button"
                                    onClick={() => handleMonthSelect(index)}
                                    className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${isSelected
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
