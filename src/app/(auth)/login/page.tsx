"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.login(email, password);
            router.push('/area-do-cliente');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] flex">
            {/* Esquerda: Visual / Branding */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 border-r border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50" />

                <div className="z-10">
                    <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:text-[#00F0FF] transition-colors">
                        Hoffby
                    </Link>
                </div>

                <div className="z-10 max-w-lg">
                    <h1 className="text-6xl font-black uppercase leading-[0.9] mb-6">
                        Acesse o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#CCFF00]">Futuro</span>
                    </h1>
                    <p className="text-lg text-white/60 font-medium">
                        Gerencie suas ferramentas, acompanhe seus projetos e vote nas próximas features.
                        Sua área exclusiva de produtividade.
                    </p>
                </div>

                <div className="z-10 text-xs font-mono text-white/40 uppercase tracking-widest">
                    © {new Date().getFullYear()} Hoffby Tecnologia Ltda. System beta
                </div>
            </div>

            {/* Direita: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md">
                    <div className="mb-10 lg:hidden">
                        <Link href="/" className="text-2xl font-black uppercase tracking-tighter">Hoffby</Link>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-black uppercase mb-2">Login</h2>
                        <p className="text-white/50">Entre com suas credenciais para continuar.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#00F0FF]">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="brutal-input bg-black border border-white/20 p-4 w-full focus:border-[#00F0FF] focus:outline-none transition-colors"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#B026FF]">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="brutal-input bg-black border border-white/20 p-4 w-full focus:border-[#B026FF] focus:outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-bold">
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-[#00F0FF] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-white flex items-center justify-center gap-2 group"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Entrar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="text-center mt-8">
                            <p className="text-sm text-white/40">
                                Não tem uma conta?{' '}
                                <Link href="/register" className="text-white hover:text-[#00F0FF] font-bold underline decoration-2 underline-offset-4 transition-colors">
                                    Criar conta
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
