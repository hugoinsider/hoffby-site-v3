"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { usePlatformI18n } from "@/context/PlatformI18nContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { t } = usePlatformI18n();

    const navItems = [
        { href: "/plataforma/admin/dashboard", icon: LayoutDashboard, label: t("dashboard.title") },
        { href: "/plataforma/admin/students", icon: Users, label: "Alunos" }, // TODO: Add to i18n
        { href: "/plataforma/admin/settings", icon: Settings, label: "Configurações" },
    ];

    return (
        <div className="flex min-h-screen bg-[#0A0A0B]">
            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="w-64 border-r border-[#38383A] bg-[#161617]/80 backdrop-blur-2xl hidden md:flex flex-col fixed h-full z-20">
                <div className="p-6">
                    <h1 className="text-xl font-semibold text-[#F5F5F7] tracking-tight">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 px-3 space-y-1 mt-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-[10px] transition-all text-[13px] font-medium ${isActive
                                    ? "bg-[#0071E3] text-white shadow-sm"
                                    : "text-[#98989D] hover:text-[#F5F5F7] hover:bg-[#FFFFFF]/5"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#38383A]">
                    <Link
                        href="/plataforma/login"
                        className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[#FF453A] hover:bg-[#FF453A]/10 transition-all text-[13px] font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
