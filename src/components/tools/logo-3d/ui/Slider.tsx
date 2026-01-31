"use client";

import React, { forwardRef } from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    valueDisplay?: React.ReactNode;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(({ label, valueDisplay, ...props }, ref) => {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    {label}
                </label>
                {valueDisplay && (
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                        {valueDisplay}
                    </span>
                )}
            </div>
            <div className="relative flex items-center h-5 w-full">
                {/* Track Background */}
                <div className="absolute w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    {/* Progress Fill */}
                    <div
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-600"
                        style={{ width: `${((Number(props.value) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0))) * 100}%` }}
                    />
                </div>
                <input
                    ref={ref}
                    type="range"
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    {...props}
                />
                {/* Thumb (Visual Only - follows standard range input logic roughly or just relies on native thumb visibility if we didn't hide input opacity) */}
                {/* Since customizing the thumb cross-browser is pain, let's try a better approach: styling the input directly with tailwind utilities for supported browsers */}
                <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-cyan-500 pointer-events-none transition-transform active:scale-110"
                    style={{
                        left: `calc(${((Number(props.value) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0))) * 100}% - 8px)`
                    }}
                />
            </div>
        </div>
    );
});

Slider.displayName = 'Slider';
