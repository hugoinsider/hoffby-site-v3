"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type?: ToastType;
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, type = "info", isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    const bgColors = {
        success: "bg-emerald-500/10 border-emerald-500/20",
        error: "bg-red-500/10 border-red-500/20",
        info: "bg-[#0071E3]/10 border-[#0071E3]/20"
    };

    const iconColors = {
        success: "text-emerald-500",
        error: "text-red-500",
        info: "text-[#0071E3]"
    };

    const icons = {
        success: <CheckCircle2 className={`w-5 h-5 ${iconColors.success}`} />,
        error: <XCircle className={`w-5 h-5 ${iconColors.error}`} />,
        info: <AlertCircle className={`w-5 h-5 ${iconColors.info}`} />
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        className={`flex items-center gap-3 p-4 pr-10 rounded-[16px] border backdrop-blur-xl shadow-2xl min-w-[320px] ${bgColors[type]} bg-[#1C1C1E]/90`}
                    >
                        {icons[type]}
                        <div className="flex flex-col">
                            <span className={`text-[14px] font-medium text-[#F5F5F7]`}>
                                {type === 'error' ? 'Erro' : type === 'success' ? 'Sucesso' : 'Informação'}
                            </span>
                            <span className="text-[13px] text-[#86868B]">{message}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[#86868B] hover:text-[#F5F5F7] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
