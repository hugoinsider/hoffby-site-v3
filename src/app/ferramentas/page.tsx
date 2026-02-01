import Link from 'next/link';
import { Shield, QrCode, Globe, Key, ArrowRight, Lock, Sparkles, User, Building2, Map, Gamepad2, Fingerprint, Code2, Code, Braces, Smartphone, Type, FileCheck, Hash, Binary, Link2, Palette, DollarSign, Box } from 'lucide-react';

export default function ToolsHubPage() {
    const tools = [
        {
            title: "Gerador de Senha",
            desc: "Crie senhas fortes e seguras com entropia máxima para proteger suas contas.",
            href: "/ferramentas/gerador-de-senha",
            icon: Key,
            color: "text-[#00F26B]",
            bg: "bg-[#00F26B]/10"
        },
        {
            title: "Gerador de Pessoas",
            desc: "Dados pessoais fictícios (Nome, CPF, RG) para testes de software válidos.",
            href: "/ferramentas/gerador-pessoas",
            icon: User,
            color: "text-[#A451FF]",
            bg: "bg-[#A451FF]/10"
        },
        {
            title: "Gerador de Empresas",
            desc: "Dados corporativos fictícios (CNPJ, Razão Social) para validação B2B.",
            href: "/ferramentas/gerador-empresas",
            icon: Building2,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Gerador de CEP",
            desc: "Códigos postais válidos por região para testes de entrega e cadastro.",
            href: "/ferramentas/gerador-cep",
            icon: Map,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            title: "Gerador de Nicks",
            desc: "Identidades únicas e gamertags para jogos e comunidades online.",
            href: "/ferramentas/gerador-nicks",
            icon: Gamepad2,
            color: "text-red-500",
            bg: "bg-red-500/10"
        },
        {
            title: "Gerador de QR Code",
            desc: "Crie QR Codes personalizados para links e textos com download em alta resolução.",
            href: "/ferramentas/gerador-qrcode",
            icon: QrCode,
            color: "text-[#A451FF]",
            bg: "bg-[#A451FF]/10"
        },
        {
            title: "Bcrypt Generator",
            desc: "Gere e verifique hashes de senha seguros usando o algoritmo bcrypt.",
            href: "/ferramentas/bcrypt",
            icon: Lock,
            color: "text-[#00F26B]",
            bg: "bg-[#00F26B]/10"
        },
        {
            title: "SHA256 Generator",
            desc: "Hashing criptográfico em tempo real usando Web Crypto API.",
            href: "/ferramentas/sha256",
            icon: Fingerprint,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "JWT Debugger",
            desc: "Decodifique e inspecione tokens JWT (Header, Payload, Signature).",
            href: "/ferramentas/jwt",
            icon: Code2,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            title: "JSON Formatter",
            desc: "Beautify e Minify para JSON. Validação de sintaxe e formatação.",
            href: "/ferramentas/json-formatter",
            icon: Braces,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            title: "HTML Live Viewer",
            desc: "Editor de código com preview em tempo real para prototipagem rápida.",
            href: "/ferramentas/html-viewer",
            icon: Code,
            color: "text-pink-500",
            bg: "bg-pink-500/10"
        },
        {
            title: "DNS Propagation",
            desc: "Verifique a propagação de DNS globalmente usando múltiplos servidores.",
            href: "/ferramentas/dns-checker",
            icon: Globe,
            color: "text-blue-400",
            bg: "bg-blue-400/10"
        },
        {
            title: "Meu IP",
            desc: "Visualize seu endereço IP público, localização e provedor (ISP).",
            href: "/ferramentas/meu-ip",
            icon: Globe,
            color: "text-[#00F26B]",
            bg: "bg-[#00F26B]/10"
        },
        {
            title: "Meu Dispositivo",
            desc: "Informações detalhadas sobre seu navegador, sistema operacional e hardware.",
            href: "/ferramentas/meu-dispositivo",
            icon: Smartphone,
            color: "text-[#A451FF]",
            bg: "bg-[#A451FF]/10"
        },
        {
            title: "Base64 Converter",
            desc: "Codifique e decodifique textos em Base64 instantaneamente.",
            href: "/ferramentas/base64",
            icon: Type,
            color: "text-white",
            bg: "bg-white/10"
        },
        {
            title: "Calculadora CRC32",
            desc: "Gere checksums CRC32 para verificação de integridade de arquivos.",
            href: "/ferramentas/crc32",
            icon: FileCheck,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Gerador MD5",
            desc: "Crie hashes MD5 rapidamente para verificação de integridade (Legacy).",
            href: "/ferramentas/md5",
            icon: Hash,
            color: "text-red-500",
            bg: "bg-red-500/10"
        },
        {
            title: "Tradutor Binário",
            desc: "Traduza textos para código binário (010101) e vice-versa.",
            href: "/ferramentas/tradutor-binario",
            icon: Binary,
            color: "text-[#00F26B]",
            bg: "bg-[#00F26B]/10"
        },
        {
            title: "URL Encoder",
            desc: "Codifique e decodifique caracteres especiais em URLs (Percent-encoding).",
            href: "/ferramentas/url-encoder",
            icon: Link2,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            title: "Gerador de Paletas",
            desc: "Crie paletas de cores harmônicas, trave cores e exporte em JSON/CSS.",
            href: "/ferramentas/gerador-paletas",
            icon: Palette,
            color: "text-pink-500",
            bg: "bg-pink-500/10"
        },
        {
            title: "Finance Pro (DRE)",
            desc: "Calculadora de Margem Líquida, DRE Mensal e Precificação com Gráficos.",
            href: "/ferramentas/calculadora-margem",
            icon: DollarSign,
            color: "text-green-400",
            bg: "bg-green-400/10"
        },
        {
            title: "Gerador de Currículo",
            desc: "Crie seu currículo dev profissional. Exportação PDF/JSON e templates otimizados.",
            href: "/ferramentas/gerador-curriculo/app",
            icon: FileCheck,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10"
        },
        {
            title: "3D Logo Visualizer",
            desc: "Transforme logos 2D (SVG/PNG) em elementos metálicos 3D com exportação.",
            href: "/tools/logo-3d",
            icon: Box,
            color: "text-neutral-200",
            bg: "bg-neutral-200/10"
        }
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white">
            <div className="relative py-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#A451FF]/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F26B]/20 bg-[#00F26B]/5 mb-6 backdrop-blur-md">
                        <Sparkles size={12} className="text-[#00F26B]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00F26B]">
                            Hoffby Utilities
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white mb-6">
                        Hub de <span className="text-[#A451FF]">Ferramentas.</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Utilitários essenciais para desenvolvedores, designers e empreendedores digitais. Segurança e produtividade em um só lugar.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {tools.map((tool, idx) => (
                        <Link key={idx} href={tool.href} className="group relative bg-[#0E0E0E] border border-white/5 rounded-[30px] p-10 overflow-hidden hover:border-white/20 transition-all duration-500">
                            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <tool.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black uppercase text-white mb-4">{tool.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                    {tool.desc}
                                </p>
                                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#00F26B] transition-colors">
                                    Acessar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className="py-10 text-center border-t border-white/5">
                <Link href="/" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                    ← Voltar para Home
                </Link>
            </footer>
        </div>
    );
}
