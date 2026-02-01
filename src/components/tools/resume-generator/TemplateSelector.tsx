import React from 'react';
import { Layout, FileText, CheckCircle2, Minus } from 'lucide-react';

interface TemplateSelectorProps {
    currentTemplate: 'modern' | 'classic' | 'minimal';
    onSelect: (template: 'modern' | 'classic' | 'minimal') => void;
}

export function TemplateSelector({ currentTemplate, onSelect }: TemplateSelectorProps) {
    const templates = [
        {
            id: 'modern',
            name: 'Moderno',
            description: 'Design tech com detalhes em esmeralda. Ideal para devs.',
            icon: <Layout size={24} className="text-emerald-500" />,
            color: 'border-emerald-500/50 hover:border-emerald-500',
            activeColor: 'bg-emerald-500/10 border-emerald-500'
        },
        {
            id: 'classic',
            name: 'O Executivo',
            description: 'Elegância atemporal com fontes serifadas e dourado.',
            icon: <FileText size={24} className="text-[#C5A059]" />,
            color: 'border-[#C5A059]/50 hover:border-[#C5A059]',
            activeColor: 'bg-[#C5A059]/10 border-[#C5A059]'
        },
        {
            id: 'minimal',
            name: 'Minimalista',
            description: 'Preto e branco puro. Foco total no conteúdo.',
            icon: <Minus size={24} className="text-white" />,
            color: 'border-white/50 hover:border-white',
            activeColor: 'bg-white/10 border-white'
        }
    ] as const;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {templates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.id)}
                    className={`relative group flex flex-col items-start p-6 rounded-xl border-2 transition-all duration-300 text-left ${currentTemplate === template.id
                            ? `${template.activeColor} shadow-lg`
                            : 'bg-[#0E0E0E] border-white/10 hover:bg-white/5'
                        }`}
                >
                    <div className="flex justify-between items-start w-full mb-4">
                        <div className={`p-3 rounded-lg bg-black/40 border border-white/5 ${currentTemplate === template.id ? 'scale-110' : ''} transition-transform`}>
                            {template.icon}
                        </div>
                        {currentTemplate === template.id && (
                            <div className="bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 animate-in zoom-in">
                                <CheckCircle2 size={12} />
                                Selecionado
                            </div>
                        )}
                    </div>

                    <h3 className={`text-lg font-bold mb-2 transition-colors ${currentTemplate === template.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {template.name}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors ${currentTemplate === template.id ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'}`}>
                        {template.description}
                    </p>

                    {/* Hover Effect Gradient */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${currentTemplate === template.id ? 'hidden' : ''}`} />
                </button>
            ))}
        </div>
    );
}
