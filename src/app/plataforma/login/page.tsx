"use client";

import { useState } from "react";
import { usePlatformI18n } from "@/context/PlatformI18nContext";
import { useRouter } from "next/navigation";
import { Toast, ToastType } from "@/components/ui/Toast";

import { Lock, Mail, AlertCircle } from "lucide-react";

export default function PlatformLogin() {
    const { t, locale, setLocale } = usePlatformI18n();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState<{ message: string, type: ToastType, visible: boolean }>({
        message: "", type: "info", visible: false
    });

    const showToast = (message: string, type: ToastType = "info") => {
        setToast({ message, type, visible: true });
    };

    const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/plataforma/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.error || 'Erro ao entrar. Verifique suas credenciais.', "error");
                setLoading(false);
                return;
            }

            if (data.success) {
                showToast("Login realizado com sucesso!", "success");

                // Small delay to let user see success message
                setTimeout(() => {
                    router.refresh();
                    if (data.role === 'admin') {
                        router.push("/plataforma/admin/dashboard");
                    } else {
                        router.push("/plataforma/student/dashboard");
                    }
                }, 1000);
            }
        } catch (err: any) {
            console.error(err);
            showToast("Erro de conexão. Tente novamente.", "error");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-[#000000]">
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.visible}
                onClose={closeToast}
            />

            {/* Apple Style: Clean, no blobs, just premium glass and contrast */}

            <div className="w-full max-w-[400px] p-8 relative z-10 animate-fade-in-up">
                <div className="mb-10 text-center">
                    {/* Minimal Logo */}
                    <div className="w-16 h-16 bg-[#1C1C1E] border border-white/10 rounded-[18px] mx-auto mb-6 flex items-center justify-center shadow-2xl">
                        <Lock className="w-6 h-6 text-[#F5F5F7]" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F5F5F7]">
                        Entrar na Plataforma de Cursos
                    </h1>
                    <p className="text-[#86868B] mt-2 text-[15px]">
                        {t("login.title")}
                    </p>
                </div>

                <div className="space-y-6">
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("login.email")}
                                    className="w-full bg-[#1C1C1E] border border-[#3A3A3C] rounded-[12px] py-4 px-4 text-[17px] text-[#F5F5F7] placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t("login.password")}
                                    className="w-full bg-[#1C1C1E] border border-[#3A3A3C] rounded-[12px] py-4 px-4 text-[17px] text-[#F5F5F7] placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-[17px] py-3.5 rounded-[12px] shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Continuar"
                            )}
                        </button>
                    </form>

                    <div className="flex justify-center gap-6 text-[13px] text-[#86868B] font-medium pt-4">
                        <button
                            onClick={() => setLocale("pt-BR")}
                            className={`hover:text-[#F5F5F7] transition-colors ${locale === "pt-BR" ? "text-[#0071E3]" : ""}`}
                        >
                            Português
                        </button>
                        <span className="w-px h-4 bg-[#3A3A3C]" />
                        <button
                            onClick={() => setLocale("en-US")}
                            className={`hover:text-[#F5F5F7] transition-colors ${locale === "en-US" ? "text-[#0071E3]" : ""}`}
                        >
                            English
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer minimalist */}
            <div className="absolute bottom-6 text-[12px] text-[#48484A]">
                Copyright © 2026 Hoffby Inc. Todos os direitos reservados.
            </div>
        </div>
    );
}
