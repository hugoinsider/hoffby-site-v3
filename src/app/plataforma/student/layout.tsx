"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePlatformI18n } from "@/context/PlatformI18nContext";
import { LogOut, User, Bell, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ProfileModal } from "@/components/plataforma/student/ProfileModal";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = usePlatformI18n();
    const pathname = usePathname();
    const router = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // Fetch current user for the profile modal
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.user) setCurrentUser(data.user);
            })
            .catch(err => console.error("Failed to load user", err));
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/plataforma/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#000000] text-[#F5F5F7] font-sans selection:bg-[#0071E3]/30">
            {/* Modal */}
            {profileModalOpen && currentUser && (
                <ProfileModal
                    isOpen={profileModalOpen}
                    onClose={() => setProfileModalOpen(false)}
                    user={currentUser}
                />
            )}

            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-[#38383A]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    <div className="flex items-center gap-12">
                        <Link href="/plataforma/student/dashboard" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-[#0071E3] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#0071E3]/20 group-hover:scale-105 transition-transform">
                                H
                            </div>
                            <span className="text-[17px] font-semibold tracking-tight text-[#F5F5F7]">Plataforma de Cursos</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/plataforma/student/dashboard"
                                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${isActive('/plataforma/student/dashboard') ? 'bg-[#3A3A3C] text-white' : 'text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#2C2C2E]'}`}
                            >
                                Meus Cursos
                            </Link>
                            <Link
                                href="#"
                                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${isActive('/community') ? 'bg-[#3A3A3C] text-white' : 'text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#2C2C2E]'}`}
                            >
                                Comunidade
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#86868B] hover:text-[#F5F5F7] transition-colors relative rounded-full hover:bg-[#2C2C2E]">
                            <Bell className="w-5 h-5" />
                        </button>

                        <div className="relative" ref={profileRef}>
                            <div
                                onClick={() => setProfileOpen(!profileOpen)}
                                className={`w-9 h-9 rounded-full bg-[#2C2C2E] border border-[#38383A] flex items-center justify-center cursor-pointer transition-all group ${profileOpen ? 'border-[#0071E3] ring-2 ring-[#0071E3]/20' : 'hover:border-[#0071E3]'}`}
                            >
                                <User className={`w-4 h-4 transition-colors ${profileOpen ? 'text-[#0071E3]' : 'text-[#86868B] group-hover:text-[#F5F5F7]'}`} />
                            </div>

                            {profileOpen && (
                                <div className="absolute right-0 top-12 w-56 bg-[#252527] border border-[#38383A] rounded-[16px] shadow-2xl p-1.5 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <div className="px-3 py-2.5 mb-1 border-b border-[#38383A]/50">
                                        <p className="text-[13px] font-medium text-[#F5F5F7] truncate max-w-[180px]">
                                            {currentUser?.user_metadata?.name || currentUser?.email || "Minha Conta"}
                                        </p>
                                        <p className="text-[11px] text-[#86868B]">Aluno</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            setProfileModalOpen(true);
                                        }}
                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-[#F5F5F7] hover:bg-[#3A3A3C] rounded-[10px] transition-colors text-left"
                                    >
                                        <Settings className="w-4 h-4 text-[#86868B]" />
                                        Editar Perfil
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-red-400 hover:text-red-300 hover:bg-[#3A3A3C] rounded-[10px] transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4 opacity-80" />
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
