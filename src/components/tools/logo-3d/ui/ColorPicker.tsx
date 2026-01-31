"use client";

import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from "react-colorful";
import { Copy, Check, ChevronDown } from 'lucide-react';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popover = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (popover.current && !popover.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const presets = [
        "#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff",
        "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#C0C0C0", "#FFD700", "#CD7F32"
    ];

    return (
        <div className="space-y-2 relative" ref={popover}>
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">
                {label}
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 p-2 bg-neutral-900 border border-white/10 rounded-lg hover:border-white/30 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-md shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-white/20"
                        style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-sm text-neutral-300 group-hover:text-white transition-colors">{color.toUpperCase()}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 z-50 p-3 bg-[#111] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
                    <HexColorPicker color={color} onChange={onChange} className="!w-full !h-[150px] mb-4" />

                    <div className="grid grid-cols-6 gap-2 mb-2">
                        {presets.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => onChange(preset)}
                                className="w-6 h-6 rounded-full border border-white/10 hover:scale-110 transiton-transform"
                                style={{ backgroundColor: preset }}
                                title={preset}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
