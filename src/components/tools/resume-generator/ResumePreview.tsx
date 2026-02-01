import React, { forwardRef } from 'react';
import { ResumeData } from './ResumeGenerator';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
    data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
    return (
        <div className="bg-white text-slate-800 p-6 md:p-[2cm] shadow-2xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] flex flex-col" ref={ref} id="resume-preview">
            <header className="border-b-2 border-slate-800 pb-5 mb-5">
                <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-1">{data.personal.fullName || 'Seu Nome'}</h1>
                <p className="text-xl text-slate-600 font-medium">{data.personal.role || 'Seu Cargo'}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-slate-600">
                    {data.personal.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} /> {data.personal.email}
                        </div>
                    )}
                    {data.personal.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} /> {data.personal.phone}
                        </div>
                    )}
                    {data.personal.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} /> {data.personal.location}
                        </div>
                    )}
                    {data.personal.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={14} /> {data.personal.linkedin}
                        </div>
                    )}
                    {data.personal.github && (
                        <div className="flex items-center gap-1.5">
                            <Github size={14} /> {data.personal.github}
                        </div>
                    )}
                </div>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                {/* Main Column */}
                <div className="md:col-span-8 space-y-6 order-2 md:order-1">
                    {data.personal.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Resumo</h2>
                            <p className="text-sm leading-relaxed text-slate-700">{data.personal.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 mt-2">Experiência Profissional</h2>
                            <div className="space-y-5">
                                {data.experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900">{exp.role}</h3>
                                            <span className="text-slate-500 text-xs font-medium">
                                                {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-slate-700 mb-1.5">
                                            {exp.company}
                                            {exp.workMode && (
                                                <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full lowercase">
                                                    {exp.workMode}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 mt-6">Projetos</h2>
                            <div className="space-y-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-slate-900">
                                                {proj.name}
                                                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="ml-2 text-xs font-normal text-emerald-600 hover:underline">Ver projeto ↗</a>}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-1.5">{proj.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {proj.technologies.map((tech, i) => (
                                                <span key={i} className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="md:col-span-4 space-y-6 order-1 md:order-2">
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Habilidades</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 mt-2">Formação</h2>
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                        <p className="text-xs text-slate-600 mb-0.5">{edu.degree} em {edu.field}</p>
                                        <span className="text-slate-400 text-[10px] font-medium block">
                                            {edu.startDate} - {edu.endDate}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 mt-6">Idiomas</h2>
                            <div className="space-y-2">
                                {data.languages.map(lang => (
                                    <div key={lang.id} className="flex justify-between text-sm">
                                        <span className="text-slate-700 font-medium">{lang.language}</span>
                                        <span className="text-slate-500 text-xs">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Branding Footer */}
            <div className="mt-auto pt-8 text-center print:pt-4">
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-medium opacity-60 flex items-center justify-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Currículo gerado pela Hoffby
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                </p>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page { 
                        margin: 0; 
                        size: A4;
                    }
                    html, body {
                        width: 210mm;
                        height: 297mm;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: visible !important;
                        visibility: hidden;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background: white;
                    }
                    /* Resume container - Make it visible and positioned */
                    #resume-preview {
                        visibility: visible;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 210mm !important;
                        min-height: 297mm !important;
                        margin: 0 !important;
                        padding: 10mm !important; /* Visual padding for the content inside paper */
                        box-shadow: none !important;
                        background: white !important;
                        z-index: 9999;
                        print-color-adjust: exact;
                    }
                    #resume-preview * {
                        visibility: visible;
                    }
                    /* 
                       SAFE PRINT STRATEGY:
                       1. Hide everything by making it invisible (but keep layout structure to avoid hiding parents)
                       2. Make resume visible
                       3. Position resume absolute top-left
                       4. Explicitly display:none specific top-level UI elements to remove ghost spacing
                    */
                    
                    body * {
                        visibility: hidden !important;
                    }
                    
                    /* Helper to hide known top-level UI containers to avoid blank pages/spacing */
                    nav, footer, header:not(#resume-preview header), .sidebar-stepper {
                        display: none !important;
                    }

                    #resume-preview, #resume-preview * {
                        visibility: visible !important;
                    }

                    #resume-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 210mm !important;
                        min-height: 297mm !important;
                        margin: 0 !important;
                        padding: 10mm !important;
                        box-shadow: none !important;
                        background: white !important;
                        z-index: 9999;
                        print-color-adjust: exact;
                        margin-top: -220px !important;
                    }
                }
            `}</style>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
