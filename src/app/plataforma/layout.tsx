import type { Metadata } from "next";
import { PlatformI18nProvider } from "@/context/PlatformI18nContext";

export const metadata: Metadata = {
    title: "Plataforma de Cursos",
    description: "Área exclusiva para alunos e professores.",
};

export default function PlatformLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PlatformI18nProvider>
            <div className="min-h-screen bg-[#000000] text-[#F5F5F7] selection:bg-[#0071E3]/30">
                {children}
            </div>
        </PlatformI18nProvider>
    );
}
