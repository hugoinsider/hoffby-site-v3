"use client";

import { useState } from "react";

interface CreateStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: any) => Promise<void>;
}

export function CreateStudentModal({ isOpen, onClose, onCreate }: CreateStudentModalProps) {
    if (!isOpen) return null;

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onCreate({ name, email, password });
        setLoading(false);
        onClose();
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-[#F5F5F7] mb-1">Novo Aluno</h3>
                        <p className="text-[#86868B] text-[15px]">Crie uma conta para o aluno.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-[13px] font-medium text-[#86868B] uppercase tracking-wider pl-1">Nome Completo</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#2C2C2E] border border-[#38383A] text-[#F5F5F7] rounded-[12px] p-3.5 focus:outline-none focus:ring-1 focus:ring-[#0071E3] transition-all placeholder:text-[#636366]"
                            placeholder="Ex: João Silva"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[13px] font-medium text-[#86868B] uppercase tracking-wider pl-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#2C2C2E] border border-[#38383A] text-[#F5F5F7] rounded-[12px] p-3.5 focus:outline-none focus:ring-1 focus:ring-[#0071E3] transition-all placeholder:text-[#636366]"
                            placeholder="aluno@email.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[13px] font-medium text-[#86868B] uppercase tracking-wider pl-1">Senha Provisória</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#2C2C2E] border border-[#38383A] text-[#F5F5F7] rounded-[12px] p-3.5 focus:outline-none focus:ring-1 focus:ring-[#0071E3] transition-all placeholder:text-[#636366]"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2.5 text-[#86868B] hover:text-[#F5F5F7] rounded-full font-medium transition-colors text-[15px]">Cancelar</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full font-medium shadow-lg shadow-[#0071E3]/20 disabled:opacity-50 transition-all active:scale-95 text-[15px] flex items-center gap-2"
                        >
                            {loading ? "Criando..." : "Criar Conta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
