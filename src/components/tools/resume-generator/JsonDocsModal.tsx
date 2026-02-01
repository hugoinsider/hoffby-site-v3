import React from 'react';
import { FileJson, Info, Copy, Check } from 'lucide-react';
import { Modal } from '../../Modal';

interface JsonDocsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function JsonDocsModal({ isOpen, onClose }: JsonDocsModalProps) {
    const CopyButton = ({ text }: { text: string }) => {
        const [copied, setCopied] = React.useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
                title="Copiar estrutura"
            >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
        );
    };

    const CodeBlock = ({ code }: { code: string }) => (
        <div className="relative group/code">
            <div className="bg-[#050505] border border-white/10 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto custom-scrollbar shadow-inner">
                <pre>{code}</pre>
            </div>
            <CopyButton text={code} />
        </div>
    );

    const headerTitle = (
        <>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Documentação JSON
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Developer Guide
                </span>
            </h2>
            <p className="text-sm text-slate-400">Guia estrutural para importação de dados</p>
        </>
    );

    const footer = (
        <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold transition-all shadow-lg shadow-emerald-900/20"
        >
            Entendi, vamos codar!
        </button>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={headerTitle}
            icon={<FileJson size={24} />}
            footer={footer}
            maxWidth="max-w-4xl"
        >
            {/* Alert Info */}
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-4 text-sm text-blue-300/90 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50" />
                <Info className="shrink-0 mt-0.5 text-blue-400" size={18} />
                <div className="space-y-1">
                    <p className="font-medium text-blue-300">Dica de Produtividade</p>
                    <p className="opacity-80 leading-relaxed">
                        Você pode criar seu próprio arquivo JSON (ex: usando um script ou exportando de outro sistema) seguindo esta estrutura.
                        Recomendamos baixar o <strong className="text-blue-200">Modelo Rico</strong> na tela anterior para ver um exemplo real preenchido.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <section className="col-span-1 md:col-span-2">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        1. Objeto Principal
                    </h3>
                    <CodeBlock code={`"personal": {
  "fullName": "String (Obrigatório)",
  "role": "String (Ex: Frontend Developer)",
  "email": "String",
  "phone": "String",
  "location": "String (Ex: São Paulo, SP)", // Opcional
  "linkedin": "String (URL ou username)",
  "github": "String (URL ou username)",
  "portfolio": "String (URL)",
  "summary": "String (Resumo profissional)"
}`} />
                </section>

                {/* Experience */}
                <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        2. Experience (Array)
                    </h3>
                    <CodeBlock code={`"experience": [
  {
    "id": "String (Único)",
    "company": "String",
    "role": "String",
    "startDate": "YYYY-MM",
    "endDate": "YYYY-MM",
    "current": Boolean,
    "workMode": "String",
    "description": "String"
  }
]`} />
                </section>

                {/* Education */}
                <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        3. Education (Array)
                    </h3>
                    <CodeBlock code={`"education": [
  {
    "id": "String (Único)",
    "institution": "String",
    "degree": "String",
    "field": "String",
    "startDate": "String",
    "endDate": "String"
  }
]`} />
                </section>

                {/* Projects */}
                <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        4. Projects (Array)
                    </h3>
                    <CodeBlock code={`"projects": [
  {
    "id": "String",
    "name": "String",
    "description": "String",
    "technologies": ["Str", "Str"],
    "link": "URL String"
  }
]`} />
                </section>

                {/* Skills & Others */}
                <section>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        5. Skills (Array)
                    </h3>
                    <CodeBlock code={`"skills": [
  "React", "Node.js", "TypeScript"
]`} />
                </section>
            </div>
        </Modal>
    );
}
