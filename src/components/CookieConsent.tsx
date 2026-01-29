'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent is already stored
        const consent = localStorage.getItem('hoffby-cookie-consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('hoffby-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('hoffby-cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-6 z-[60] max-w-sm w-full"
                >
                    <div className="relative bg-[#0E0E0E]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#A451FF]/20 blur-[50px] rounded-full pointer-events-none" />

                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-lg bg-[#A451FF]/10 flex items-center justify-center text-[#A451FF] shrink-0">
                                <Cookie size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Cookies & Dados</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Utilizamos cookies para otimizar sua experiência e analisar o tráfego. Ao continuar, você concorda com nossa <Link href="/privacidade" className="text-[#00F26B] hover:underline">Política de Privacidade</Link>.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                            <button
                                onClick={handleDecline}
                                className="flex-1 py-2.5 px-4 rounded-lg border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                            >
                                Recusar
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-2.5 px-4 rounded-lg bg-[#A451FF] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#902bf5] transition-all shadow-[0_0_15px_rgba(164,81,255,0.2)] hover:shadow-[0_0_20px_rgba(164,81,255,0.4)]"
                            >
                                Aceitar
                            </button>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
