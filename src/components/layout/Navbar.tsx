'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ArrowRight, ChevronDown,
    Zap, Lock, Palette, FileText, LayoutTemplate,
    ShoppingBag, Rocket
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        {
            label: "Produtos",
            id: "products",
            children: [
                { title: "Gerador de Currículo", desc: "Premium. Crie CVs otimizados para ATS.", icon: FileText, href: "/ferramentas/gerador-curriculo", highlight: true },
                { title: "Gerador de Senhas", desc: "Segurança máxima para suas contas.", icon: Lock, href: "/ferramentas/gerador-de-senha" },
                { title: "Gerador de Paletas", desc: "Cores perfeitas para seus projetos.", icon: Palette, href: "/ferramentas/gerador-de-paletas" },
                { title: "Ver Todos", desc: "Explore todas as ferramentas.", icon: Zap, href: "/ferramentas" },
            ]
        },
        {
            label: "Soluções",
            id: "solutions",
            children: [
                { title: "SaaS Factory", desc: "Do MVP ao Scale. Construímos seu produto.", icon: Rocket, href: "/#saas-factory" },
                { title: "AI para Ecommerce", desc: "Venda mais com inteligência.", icon: ShoppingBag, href: "/#soluções" },
            ]
        },
        {
            label: "Empresa",
            id: "company",
            children: [
                { title: "Sobre Nós", desc: "Nossa história e DNA.", icon: LayoutTemplate, href: "/#legado" },
                { title: "Cases", desc: "O que já construímos.", icon: Zap, href: "/#cases" },
                { title: "Contato", desc: "Fale com nosso time.", icon: ArrowRight, href: "/#contato" },
            ]
        }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6 md:py-8'}`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div
                className={`max-w-7xl mx-auto px-6 ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl md:rounded-full border border-white/5 shadow-2xl py-3' : ''} flex justify-between items-center transition-all relative`}
            >
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <Logo className="w-24 h-11" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative"
                            onMouseEnter={() => setActiveDropdown(item.id)}
                        >
                            <button
                                className={`text-sm font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 py-4 ${activeDropdown === item.id ? 'text-white' : 'text-slate-400'}`}
                            >
                                {item.label} <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Content */}
                            <AnimatePresence>
                                {activeDropdown === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-[#0E0E0E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 z-40"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                        <div className="relative z-10 flex flex-col gap-1">
                                            {item.children.map((child, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={child.href}
                                                    className={`flex items-start gap-3 p-3 rounded-xl transition-all group ${child.highlight ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20' : 'hover:bg-white/5'}`}
                                                >
                                                    <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${child.highlight ? 'bg-emerald-500 text-black' : 'bg-white/5 text-slate-400 group-hover:bg-white group-hover:text-black transition-colors'}`}>
                                                        <child.icon size={16} />
                                                    </div>
                                                    <div>
                                                        <div className={`text-sm font-bold flex items-center gap-2 ${child.highlight ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'}`}>
                                                            {child.title}
                                                            {child.highlight && <span className="text-[9px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-500 border border-emerald-500/20 uppercase">Novo</span>}
                                                        </div>
                                                        <div className="text-xs text-slate-500 leading-tight mt-1">{child.desc}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/ferramentas/gerador-curriculo"
                        className="hidden lg:flex text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 mr-4"
                    >
                        Gerador de Currículo
                    </Link>
                    <button onClick={() => window.location.href = '/#contato'} className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00F26B] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,107,0.4)]">
                        Iniciar Projeto <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 bg-[#050505] z-40 pt-24 px-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {menuItems.map((item) => (
                                <div key={item.id} className="border-b border-white/5 pb-6">
                                    <div className="text-sm font-black uppercase text-slate-500 mb-4 tracking-widest">{item.label}</div>
                                    <div className="flex flex-col gap-4">
                                        {item.children.map((child, idx) => (
                                            <Link
                                                key={idx}
                                                href={child.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between"
                                            >
                                                <span className={`font-bold ${child.highlight ? 'text-emerald-400' : 'text-white'}`}>{child.title}</span>
                                                <ArrowRight size={16} className="text-slate-600" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
