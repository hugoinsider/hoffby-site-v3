"use client";

import { useState, useEffect } from "react";
import { X, User, Lock, Mail, Save } from "lucide-react";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
    if (!isOpen) return null;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

    useEffect(() => {
        if (user) {
            setName(user.user_metadata?.name || user.name || "");
        }
    }, [user]);

    const handleSubmit = async () => {
        setLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const res = await fetch('/api/plataforma/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    password: password || undefined
                })
            });

            if (res.ok) {
                setStatus({ type: 'success', message: "Perfil atualizado com sucesso!" });
                setPassword(""); // Clear password field
                // Optional: Refresh router or parent state
            } else {
                const data = await res.json();
                setStatus({ type: 'error', message: data.error || "Erro ao atualizar." });
            }
        } catch (e) {
            setStatus({ type: 'error', message: "Erro de conexão." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1C1C1E] border border-[#38383A] rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-[#38383A] bg-[#1C1C1E] flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[#F5F5F7]">Editar Perfil</h3>
                    <button onClick={onClose} className="text-[#86868B] hover:text-[#F5F5F7] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">

                    {/* Status Message */}
                    {status.message && (
                        <div className={`p-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[13px] text-[#86868B] font-medium uppercase tracking-wide">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#2C2C2E] border border-[#38383A] rounded-[14px] py-3 pl-12 pr-4 text-[#F5F5F7] placeholder-[#636366] focus:outline-none focus:border-[#0071E3] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[13px] text-[#86868B] font-medium uppercase tracking-wide">E-mail</label>
                        <div className="relative opacity-60">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full bg-[#2C2C2E] border border-[#38383A] rounded-[14px] py-3 pl-12 pr-4 text-[#86868B] cursor-not-allowed"
                            />
                        </div>
                        <p className="text-[12px] text-[#636366]">O e-mail não pode ser alterado.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[13px] text-[#86868B] font-medium uppercase tracking-wide">
                            Nova Senha <span className="text-[#636366] normal-case tracking-normal">(Opcional)</span>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#2C2C2E] border border-[#38383A] rounded-[14px] py-3 pl-12 pr-4 text-[#F5F5F7] placeholder-[#636366] focus:outline-none focus:border-[#0071E3] transition-colors"
                            />
                        </div>
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
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </div>
        </div>
    );
}
