import React, { forwardRef } from 'react';
import { ResumeData } from './ResumeGenerator';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
    data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
    return (
        <div className="bg-white text-slate-800 p-6 md:p-[2cm] shadow-2xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] flex flex-col" ref={ref} id="resume-preview">
            {/* Header */}
            <header className="border-b-2 border-slate-800 pb-8 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-2">{data.personal.fullName || 'Seu Nome'}</h1>
                <p className="text-xl text-slate-600 font-medium">{data.personal.role || 'Seu Cargo'}</p>

                <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-600">
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                {/* Main Column */}
                <div className="md:col-span-8 space-y-8 order-2 md:order-1">
                    {data.personal.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Resumo</h2>
                            <p className="text-sm leading-relaxed text-slate-700">{data.personal.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Experiência Profissional</h2>
                            <div className="space-y-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900">{exp.role}</h3>
                                            <span className="text-slate-500 text-xs font-medium">
                                                {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-slate-700 mb-2">
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
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 mt-8">Projetos</h2>
                            <div className="space-y-6">
                                {data.projects.map(proj => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900">
                                                {proj.name}
                                                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="ml-2 text-xs font-normal text-emerald-600 hover:underline">Ver projeto ↗</a>}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-2">{proj.description}</p>
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
                <div className="md:col-span-4 space-y-8 order-1 md:order-2 border-b md:border-b-0 md:border-l border-slate-200 pb-8 md:pb-0 md:pl-8">
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Formação</h2>
                            <div className="space-y-6">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                        <div className="text-sm text-slate-700">{edu.degree}</div>
                                        <div className="text-sm text-slate-500 mb-1">{edu.field}</div>
                                        <div className="text-xs text-slate-400">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Habilidades</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page { margin: 0; }
                    body { 
                        visibility: hidden; 
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact;
                    }
                    #resume-preview {
                        visibility: visible;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 21cm;
                        height: 29.7cm;
                        margin: 0 auto;
                        padding: 0.5cm !important;
                        box-shadow: none;
                        background: white;
                        z-index: 9999;
                    }
                    #resume-preview * {
                        visibility: visible;
                    }
                    /* Hide everything else explicitly just in case */
                    nav, footer, button, header:not(#resume-preview header) {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
