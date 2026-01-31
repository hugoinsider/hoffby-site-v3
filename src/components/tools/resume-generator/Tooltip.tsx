import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
    content: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export function Tooltip({ content, children, className = '' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className={`relative inline-flex items-center ml-2 ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <div className="cursor-help text-slate-500 hover:text-emerald-400 transition-colors">
                {children || <Info size={14} />}
            </div>

            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#151515] border border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-xs text-slate-300 leading-relaxed text-center">
                        {content}
                    </p>
                    {/* Arrow */}
                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#151515] border-r border-b border-white/10 rotate-45 transform" />
                </div>
            )}
        </div>
    );
}
