'use client';

import React, { useState, useEffect } from 'react';
import { Code, Eye, RefreshCw, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

const defaultHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: sans-serif; 
      background: #f0f0f0; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      margin: 0; 
    }
    .card { 
      background: white; 
      padding: 2rem; 
      border-radius: 1rem; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
      text-align: center; 
    }
    h1 { color: #333; }
    p { color: #666; }
    button {
       background: linear-gradient(135deg, #A451FF, #00F26B);
       border: none;
       padding: 10px 20px;
       color: white;
       border-radius: 8px;
       font-weight: bold;
       cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello World</h1>
    <p>Edit the code on the left to see changes instantly.</p>
    <button>Click Me</button>
  </div>
</body>
</html>`;

export default function HtmlViewerPage() {
    const [code, setCode] = useState(defaultHtml);
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(code);
        }, 500); // Debounce rendering
        return () => clearTimeout(timeout);
    }, [code]);

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Header */}
            <div className="w-full max-w-[1600px] mb-6 flex justify-between items-end">
                <div>
                    <div className="flex mb-4">
                        <Logo className="w-12 h-12" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-2 block">
                        ← Voltar
                    </Link>
                    <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-2">
                        HTML <span className="text-blue-500">Live Viewer</span>
                    </h1>
                </div>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-2"><Code size={14} /> Editor</span>
                    <span className="flex items-center gap-2"><Eye size={14} /> Preview</span>
                </div>
            </div>

            <div className="max-w-[1600px] w-full h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

                {/* EDITOR */}
                <div className="bg-[#0E0E0E] border border-white/5 rounded-2xl p-4 flex flex-col shadow-2xl">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <button onClick={() => setCode(defaultHtml)} className="text-slate-500 hover:text-white transition-colors">
                            <RefreshCw size={14} />
                        </button>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-grow bg-[#050505] p-4 rounded-xl font-mono text-xs md:text-sm text-slate-300 outline-none resize-none leading-relaxed border border-white/5 focus:border-blue-500/50 transition-colors"
                        spellCheck={false}
                    />
                </div>

                {/* PREVIEW */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
                    <iframe
                        srcDoc={srcDoc}
                        title="preview"
                        className="w-full h-full border-none"
                        sandbox="allow-scripts"
                    />
                </div>

            </div>
        </div>
    );
}
