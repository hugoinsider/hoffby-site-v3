import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#A451FF] hover:text-white transition-colors mb-12">
                    <ArrowLeft size={16} /> Voltar para Home
                </Link>

                <header className="mb-16">
                    <div className="w-12 h-12 rounded-xl bg-[#A451FF]/10 flex items-center justify-center text-[#A451FF] mb-6">
                        <Lock size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-4">
                        Política de <span className="text-[#00F26B]">Privacidade</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Última atualização: Janeiro 2026</p>
                </header>

                <article className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-xl text-slate-400">
                        A sua privacidade é importante para nós. É política do Hoffby respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Hoffby, e outros sites que possuímos e operamos.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">1. Informações que coletamos</h3>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">2. Uso de Dados</h3>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-400">
                        <li>Melhoria da experiência do usuário no site.</li>
                        <li>Envio de comunicações sobre novos produtos ou serviços.</li>
                        <li>Suporte ao cliente e atendimento.</li>
                    </ul>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">3. Compartilhamento</h3>
                    <p>
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">4. Cookies</h3>
                    <p>
                        O nosso site usa cookies para garantir que você obtenha a melhor experiência. Ao continuar a usar nosso site, você concorda com o uso de cookies.
                    </p>
                </article>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center text-slate-600 text-sm">
                    <p>© 2026 Hoffby Tecnologia Ltda. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}
