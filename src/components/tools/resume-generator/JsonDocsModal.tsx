import React from 'react';
import { X, FileJson, Info } from 'lucide-react';

interface JsonDocsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function JsonDocsModal({ isOpen, onClose }: JsonDocsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <FileJson size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Documentação do JSON</h2>
                            <p className="text-sm text-slate-400">Guia de estrutura para importação de currículos</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                    {/* Introduction */}
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3 text-sm text-blue-300">
                        <Info className="shrink-0 mt-0.5" size={16} />
                        <p>
                            Você pode criar seu próprio arquivo JSON seguindo esta estrutura e importá-lo no gerador.
                            Recomendamos baixar o <strong>Modelo Preenchido</strong> primeiro para usar como base.
                        </p>
                    </div>

                    {/* Personal Info */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-white/5 pb-2">1. Personal (Objeto)</h3>
                        <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                            <pre>{`"personal": {
  "fullName": "String (Obrigatório)",
  "role": "String (Ex: Frontend Developer)",
  "email": "String",
  "phone": "String",
  "location": "String (Ex: São Paulo, SP)", // Opcional
  "linkedin": "String (URL ou username)",
  "github": "String (URL ou username)",
  "portfolio": "String (URL)",
  "summary": "String (Resumo profissional)"
}`}</pre>
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-white/5 pb-2">2. Experience (Array)</h3>
                        <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                            <pre>{`"experience": [
  {
    "id": "String (Único, ex: '1')",
    "company": "String (Nome da empresa)",
    "role": "String (Cargo)",
    "startDate": "String (YYYY-MM)", // Importante: Formato YYYY-MM
    "endDate": "String (YYYY-MM)",   // Vazio se for atual
    "current": Boolean (true/false), // Se trabalha atualmente
    "workMode": "String ('Presencial' | 'Remoto' | 'Híbrido')",
    "description": "String (Detalhes das atividades)"
  }
]`}</pre>
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-white/5 pb-2">3. Skills (Array de Strings)</h3>
                        <p className="text-slate-400 mb-2 text-sm">Lista simples de tecnologias ou habilidades.</p>
                        <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                            <pre>{`"skills": [
  "React",
  "Node.js",
  "TypeScript",
  "Agile"
]`}</pre>
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-white/5 pb-2">4. Education (Array)</h3>
                        <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                            <pre>{`"education": [
  {
    "id": "String (Único)",
    "institution": "String (Universidade/Escola)",
    "degree": "String (Grau/Tipo)",
    "field": "String (Área de estudo)",
    "startDate": "String (Ano ou YYYY-MM)",
    "endDate": "String (Ano ou YYYY-MM)"
  }
]`}</pre>
                        </div>
                    </section>

                    {/* Projects */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-white/5 pb-2">5. Projects (Array)</h3>
                        <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                            <pre>{`"projects": [
  {
    "id": "String (Único)",
    "name": "String (Nome do Projeto)",
    "description": "String (O que foi feito)",
    "technologies": ["Array", "de", "Strings"],
    "link": "String (URL do repositório ou demo)"
  }
]`}</pre>
                        </div>
                    </section>

                    {/* Languages */}
                    <section>
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-white/5 pb-2">6. Languages (Array)</h3>
                        <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                            <pre>{`"languages": [
  {
    "id": "String (Único)",
    "language": "String (Idioma)",
    "level": "String (Nível: Básico, Fluente, Nativo...)"
  }
]`}</pre>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    );
}
