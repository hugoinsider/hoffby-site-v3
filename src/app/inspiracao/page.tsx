import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Zap } from 'lucide-react';

const VIDEOS = [
    { id: 'Rw1zDiSWFtQ', title: 'Inspiração 1' },
    { id: 'yhMQsSko928', title: 'Inspiração 2' },
    { id: 'O1NGdy8Qmyw', title: 'Inspiração 3' },
    { id: 'e4Y_E2K-hss', title: 'Inspiração 4' },
    { id: 'Z3qH1L_TCO0', title: 'Inspiração 5' },
    { id: 'nLfYojmHw8Y', title: 'Inspiração 6' },
    { id: 'GqecDgFMRH0', title: 'Inspiração 7' },
    { id: 'w6PbW5A4H7U', title: 'Inspiração 8' },
    { id: '5Y6wwFQSLGM', title: 'Inspiração 9' },
    { id: 'cd4YUFwB2C4', title: 'Inspiração 10' },
    { id: 'raDPVPB49Cg', title: 'Inspiração 11' },
    { id: '0vP9QraXA34', title: 'Inspiração 12' },
];

export default function InspirationPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#A451FF]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00F26B]/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#A451FF] hover:text-white transition-colors mb-12">
                    <ArrowLeft size={16} /> Voltar para Home
                </Link>

                <header className="mb-20 text-center">
                    <span className="text-[#00F26B] font-bold text-xs uppercase tracking-[0.3em] mb-4 block inline-flex items-center gap-2 justify-center">
                        <Zap size={14} /> Referências
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-6">
                        A Fonte da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F26B] to-[#A451FF]">Criação</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Toda grande obra tem uma origem. Esta é a curadoria de sons e imagens que alimentam nossa criatividade e moldam nossa visão de mundo.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VIDEOS.map((video) => (
                        <div key={video.id} className="group relative bg-[#0E0E0E] rounded-3xl overflow-hidden border border-white/5 hover:border-[#A451FF]/30 transition-all hover:shadow-[0_0_30px_rgba(164,81,255,0.1)]">
                            <div className="aspect-video w-full bg-black relative">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                {/* Overlay just for initial style if needed, but iframe covers it. 
                             Usually better to use an innovative thumbnail approach, but raw embed is requested.
                         */}
                            </div>
                            <div className="p-4 flex items-center justify-between border-t border-white/5 bg-[#0A0A0A]">
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">REF_ID: {video.id}</span>
                                <PlayCircle size={20} className="text-[#00F26B] group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center text-slate-600 text-sm">
                    <p>© 2026 Hoffby Tecnologia Ltda. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}
