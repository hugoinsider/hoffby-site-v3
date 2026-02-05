"use client";

import { useState, useEffect } from "react";
import { X, DollarSign } from "lucide-react";

interface PriceModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: any;
    onSave: (courseId: string, newPrice: number) => Promise<void>;
}

export function PriceModal({ isOpen, onClose, course, onSave }: PriceModalProps) {
    if (!isOpen) return null;

    const [price, setPrice] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course) {
            setPrice(course.price?.toString() || "");
        }
    }, [course]);

    const handleSubmit = async () => {
        setLoading(true);
        const numericPrice = parseFloat(price.replace(",", ".")) || 0;
        await onSave(course.id, numericPrice);
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-[#38383A] bg-[#1C1C1E] flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[#F5F5F7]">Definir Preço</h3>
                    <button onClick={onClose} className="text-[#86868B] hover:text-[#F5F5F7] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-[13px] text-[#86868B] font-medium uppercase tracking-wide">Preço (BRL)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-[#2C2C2E] border border-[#38383A] rounded-[14px] py-3 pl-12 pr-4 text-[#F5F5F7] placeholder-[#636366] focus:outline-none focus:border-[#0071E3] transition-colors font-medium text-lg"
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            />
                        </div>
                        <p className="text-[13px] text-[#636366]">
                            Defina o valor de venda deste curso. Use 0 para gratuito.
                        </p>
                    </div>
                </div>

                <div className="p-5 border-t border-[#38383A] bg-[#2C2C2E]/30 flex justify-end gap-3 backdrop-blur-xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-full font-medium transition-colors text-[15px]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full font-medium shadow-lg shadow-[#0071E3]/20 disabled:opacity-50 transition-all active:scale-95 text-[15px] flex items-center gap-2"
                    >
                        {loading ? "Salvando..." : "Salvar Preço"}
                    </button>
                </div>
            </div>
        </div>
    );
}
