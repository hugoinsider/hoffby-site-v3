"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { Loader2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.register(email, password);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#050505] text-[#ededed] flex items-center justify-center p-6">
                <div className="max-w-md w-full border border-[#00F0FF] bg-[#00F0FF]/5 p-12 text-center">
                    <h2 className="text-4xl font-black uppercase text-[#00F0FF] mb-4">Verifique seu Email</h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        Enviamos um link de confirmação para <strong>{email}</strong>.
                        Por favor, confirme sua conta para acessar a plataforma.
                    </p>
                    <Link href="/login" className="inline-block bg-[#00F0FF] text-black font-black uppercase tracking-widest py-3 px-8 hover:bg-white transition-colors">
                        Voltar para Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] flex">
            {/* Esquerda: Visual / Branding */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 border-r border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent opacity-50" />

                <div className="z-10">
                    <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:text-[#CCFF00] transition-colors">
                        Hoffby
                    </Link>
                </div>

                <div className="z-10 max-w-lg">
                    <h1 className="text-6xl font-black uppercase leading-[0.9] mb-6">
                        Crie sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#00F0FF]">Conta</span>
                    </h1>
                    <p className="text-lg text-white/60 font-medium">
                        Junte-se a milhares de desenvolvedores que usam o Hoffby para acelerar seu workflow.
                        É grátis e sempre evoluindo.
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
                        <h2 className="text-3xl font-black uppercase mb-2">Cadastro</h2>
                        <p className="text-white/50">Preencha os dados abaixo para criar sua conta.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#CCFF00]">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="brutal-input bg-black border border-white/20 p-4 w-full focus:border-[#CCFF00] focus:outline-none transition-colors"
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
                                placeholder="Crie uma senha forte"
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
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-[#CCFF00] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-white flex items-center justify-center gap-2 group"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Criar Conta <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="text-center mt-8">
                            <p className="text-sm text-white/40">
                                Já tem uma conta?{' '}
                                <Link href="/login" className="text-white hover:text-[#CCFF00] font-bold underline decoration-2 underline-offset-4 transition-colors">
                                    Fazer Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
