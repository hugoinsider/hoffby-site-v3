"use client";

import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
    loading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    isDestructive = false,
    loading = false
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#2C2C2E] flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className={`w-6 h-6 ${isDestructive ? 'text-red-500' : 'text-[#FF9F0A]'}`} />
                    </div>

                    <h3 className="text-xl font-semibold text-[#F5F5F7] mb-2">{title}</h3>
                    <p className="text-[#86868B] text-[15px] leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="p-5 border-t border-[#38383A] bg-[#2C2C2E]/30 flex flex-col gap-3 backdrop-blur-xl">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`w-full py-3 rounded-[14px] font-semibold text-[15px] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2
                            ${isDestructive
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                                : "bg-[#0071E3] text-white hover:bg-[#0077ED]"
                            }`}
                    >
                        {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                        {loading ? "Processando..." : confirmText}
                    </button>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full py-3 text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-[14px] font-medium transition-colors text-[15px]"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
