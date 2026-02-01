import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: string;
    className?: string; // Content container class
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    icon,
    footer,
    maxWidth = "max-w-4xl",
    className = ""
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`bg-[#0E0E0E] border border-white/10 rounded-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col shadow-2xl shadow-emerald-900/10 animate-in zoom-in-95 duration-300 relative overflow-hidden`}>

                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Header */}
                {(title || icon) && (
                    <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#0E0E0E]/50 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            {icon && (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                                    {icon}
                                </div>
                            )}
                            <div>
                                {typeof title === 'string' ? (
                                    <h2 className="text-xl font-bold text-white">{title}</h2>
                                ) : (
                                    title
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/5"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className={`relative z-10 flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth ${className}`}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="relative z-10 p-6 border-t border-white/5 bg-[#0E0E0E]/50 backdrop-blur-xl flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
