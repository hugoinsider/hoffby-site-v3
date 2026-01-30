import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hoffby | Soluções Tecnológicas", // Título otimizado
  description: "Automação, SaaS e Inteligência Artificial para o seu negócio.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Mudamos para pt-BR
    // 2. Adicionamos suppressHydrationWarning para evitar erros com extensões
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505]`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <CookieConsent />
      </body>
    </html>
  );
}