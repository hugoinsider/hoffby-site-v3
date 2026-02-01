import React, { forwardRef } from 'react';
import { ResumeData } from './ResumeGenerator';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const FontStyles = () => (
    <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
    `}</style>
);

interface ResumePreviewProps {
    data: ResumeData;
    template?: 'modern' | 'classic' | 'minimal';
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, template = 'modern' }, ref) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        if (year && month) {
            return `${month}/${year}`;
        }
        return dateString;
    };

    // Modern Layout (Original inspired: Tech, Emerald, Clean)
    const ModernLayout = () => (
        <div className="bg-white text-slate-800 p-8 md:p-[2.5cm] shadow-2xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] flex flex-col font-sans relative overflow-hidden" ref={ref} id="resume-preview-modern">
            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

            <header className="mb-10 text-left">
                <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{data.personal.fullName || 'Seu Nome'}</h1>
                <p className="text-lg text-emerald-600 font-medium mb-6 uppercase tracking-wider">{data.personal.role || 'Seu Cargo'}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 border-t border-slate-200 pt-6">
                    {data.personal.email && <div className="flex items-center gap-2"><Mail size={16} className="text-emerald-500" /> {data.personal.email}</div>}
                    {data.personal.phone && <div className="flex items-center gap-2"><Phone size={16} className="text-emerald-500" /> {data.personal.phone}</div>}
                    {data.personal.location && <div className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> {data.personal.location}</div>}
                    {data.personal.linkedin && <div className="flex items-center gap-2"><Linkedin size={16} className="text-emerald-500" /> {data.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</div>}
                    {data.personal.github && <div className="flex items-center gap-2"><Github size={16} className="text-emerald-500" /> {data.personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</div>}
                    {data.personal.portfolio && <div className="flex items-center gap-2"><Globe size={16} className="text-emerald-500" /> {data.personal.portfolio.replace(/^https?:\/\//, '')}</div>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="col-span-8 space-y-8">
                    {data.personal.summary && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-8 h-1 bg-emerald-500"></span> Resumo
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-justify text-sm">
                                {data.personal.summary}
                            </p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-emerald-500"></span> Experiência
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-800">{exp.role}</h3>
                                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
                                                {formatDate(exp.startDate)} — {exp.current ? 'Presente' : formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2 text-sm">
                                            <span className="font-semibold text-slate-700">{exp.company}</span>
                                            {exp.workMode && <span className="text-xs text-slate-400">• {exp.workMode}</span>}
                                        </div>
                                        <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-emerald-500"></span> Projetos
                            </h2>
                            <div className="grid gap-6">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-slate-800">{proj.name}</h3>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-xs hover:underline flex items-center gap-1">
                                                    Ver Projeto <Globe size={10} />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {proj.technologies.map((tech, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-500 text-[10px] rounded uppercase font-bold tracking-wide shadow-sm">
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
                <div className="col-span-4 space-y-8">
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Competências</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-800 text-white text-xs rounded font-medium shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Educação</h2>
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1">{edu.institution}</h3>
                                        <p className="text-xs text-slate-600 mb-1">{edu.degree} em {edu.field}</p>
                                        <span className="text-[10px] text-slate-400 block">
                                            {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Idiomas</h2>
                            <div className="space-y-2">
                                {data.languages.map(lang => (
                                    <div key={lang.id} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-700 font-medium">{lang.language}</span>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );

    // Classic Layout (The new "Executive" one)
    const ClassicLayout = () => (
        <div className="bg-white text-[#1A1A1A] p-8 md:p-[2.5cm] shadow-2xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] flex flex-col font-sans" ref={ref} id="resume-preview-classic">
            <FontStyles />

            <header className="text-center mb-10">
                <h1 className="text-5xl font-serif text-[#1A1A1A] mb-3 tracking-tight font-medium uppercase">{data.personal.fullName || 'Seu Nome'}</h1>
                <p className="text-lg text-[#C5A059] uppercase tracking-[0.2em] font-medium mb-6">{data.personal.role || 'Seu Cargo'}</p>

                <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mb-6 opacity-60"></div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.85rem] text-[#4A4A4A] font-light tracking-wide px-10">
                    {data.personal.email && <div className="flex items-center gap-2">{data.personal.email}</div>}
                    {data.personal.phone && (
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                            {data.personal.phone}
                        </div>
                    )}
                    {data.personal.location && (
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                            {data.personal.location}
                        </div>
                    )}
                    {data.personal.linkedin && (
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                            {data.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                        </div>
                    )}
                    {data.personal.portfolio && (
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                            {data.personal.portfolio.replace(/^https?:\/\//, '')}
                        </div>
                    )}
                </div>
            </header>

            <div className="space-y-10">
                {data.personal.summary && (
                    <section>
                        <h2 className="text-lg font-serif text-[#1A1A1A] mb-3 border-b border-[#E5E5E5] pb-2 flex items-center gap-3">
                            Resumo Profissional
                        </h2>
                        <p className="text-[0.95rem] leading-7 text-[#4A4A4A] font-light text-justify">
                            {data.personal.summary}
                        </p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-serif text-[#1A1A1A] mb-6 border-b border-[#E5E5E5] pb-2">
                            Experiência Profissional
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[1rem] font-serif font-bold text-[#1A1A1A]">{exp.role}</h3>
                                        <span className="text-sm font-serif italic text-[#C5A059]">
                                            {formatDate(exp.startDate)} — {exp.current ? 'Presente' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs uppercase tracking-widest font-bold text-[#666]">{exp.company}</span>
                                        {exp.workMode && <span className="text-[10px] bg-[#f5f5f5] px-2 py-0.5 rounded text-[#888]">{exp.workMode}</span>}
                                    </div>
                                    <p className="text-[0.9rem] text-[#4A4A4A] leading-6 text-justify font-light">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-10">
                        {data.projects.length > 0 && (
                            <section>
                                <h2 className="text-lg font-serif text-[#1A1A1A] mb-4 border-b border-[#E5E5E5] pb-2">
                                    Projetos de Impacto
                                </h2>
                                <div className="space-y-6">
                                    {data.projects.map(proj => (
                                        <div key={proj.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-serif font-bold text-[#1A1A1A] text-sm">{proj.name}</h3>
                                                {proj.link && (
                                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase text-[#C5A059] tracking-wider hover:underline">
                                                        Link ↗
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-[0.85rem] text-[#4A4A4A] mb-2 leading-relaxed font-light">{proj.description}</p>
                                            <div className="text-[10px] text-[#888] font-serif italic">
                                                {proj.technologies.join(' • ')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-10">
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-lg font-serif text-[#1A1A1A] mb-4 border-b border-[#E5E5E5] pb-2">
                                    Educação
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="font-serif font-bold text-[#1A1A1A] text-sm mb-1">{edu.institution}</h3>
                                            <p className="text-[0.85rem] text-[#4A4A4A] italic mb-1">{edu.degree} em {edu.field}</p>
                                            <span className="text-[10px] text-[#C5A059] font-serif block">
                                                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.skills.length > 0 && (
                            <section>
                                <h2 className="text-lg font-serif text-[#1A1A1A] mb-4 border-b border-[#E5E5E5] pb-2">
                                    Competências
                                </h2>
                                <p className="text-[0.9rem] text-[#4A4A4A] leading-6 font-light">
                                    {data.skills.join(' • ')}
                                </p>
                            </section>
                        )}

                        {data.languages.length > 0 && (
                            <section>
                                <h2 className="text-lg font-serif text-[#1A1A1A] mb-4 border-b border-[#E5E5E5] pb-2">
                                    Idiomas
                                </h2>
                                <div className="space-y-2">
                                    {data.languages.map(lang => (
                                        <div key={lang.id} className="flex justify-between items-center text-sm border-b border-dotted border-[#eee] pb-1 last:border-0">
                                            <span className="text-[#333]">{lang.language}</span>
                                            <span className="text-[#777] font-serif italic text-xs">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Minimal Layout (Pure B&W, Very simple)
    const MinimalLayout = () => (
        <div className="bg-white text-black p-10 md:p-[2.5cm] mx-auto w-full max-w-[21cm] min-h-[29.7cm] flex flex-col font-sans" ref={ref} id="resume-preview-minimal">
            <header className="mb-12 border-b-2 border-black pb-6">
                <h1 className="text-5xl font-extrabold tracking-tighter mb-2">{data.personal.fullName || 'Seu Nome'}</h1>
                <p className="text-xl font-light tracking-widest uppercase text-gray-500 mb-6">{data.personal.role || 'Seu Cargo'}</p>
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>• {data.personal.phone}</span>}
                    {data.personal.linkedin && <span>• linkedin.com/in/{data.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
                    {data.personal.location && <span>• {data.personal.location}</span>}
                </div>
            </header>

            <div className="grid grid-cols-1 gap-10">
                {data.personal.summary && (
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-gray-400">Sobre</h3>
                        <p className="text-sm leading-relaxed max-w-2xl font-medium">
                            {data.personal.summary}
                        </p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Experiência</h3>
                        <div className="space-y-8 pl-4 border-l border-gray-200">
                            {data.experience.map(exp => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-black"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-lg">{exp.role}</h4>
                                        <span className="text-xs font-mono text-gray-500">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold mb-2">{exp.company}</div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        {data.education.length > 0 && (
                            <section className="mb-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Educação</h3>
                                <div className="space-y-4">
                                    {data.education.map(edu => (
                                        <div key={edu.id}>
                                            <div className="font-bold">{edu.institution}</div>
                                            <div className="text-sm">{edu.degree} em {edu.field}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.languages.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Idiomas</h3>
                                <div className="space-y-1">
                                    {data.languages.map(lang => (
                                        <div key={lang.id} className="text-sm flex justify-between border-b border-gray-100 py-1">
                                            <span className="font-medium">{lang.language}</span>
                                            <span className="text-gray-500">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div>
                        {data.skills.length > 0 && (
                            <section className="mb-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Skills</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {data.skills.map((skill, i) => (
                                        <span key={i} className="text-sm font-bold border-b-2 border-transparent hover:border-black transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.projects.length > 0 && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Projetos</h3>
                                <div className="space-y-4">
                                    {data.projects.map(proj => (
                                        <div key={proj.id}>
                                            <div className="font-bold text-sm mb-1">{proj.name}</div>
                                            <p className="text-xs text-gray-600 mb-1 line-clamp-2">{proj.description}</p>
                                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                                {proj.technologies.slice(0, 3).join(', ')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {template === 'modern' && <ModernLayout />}
            {template === 'classic' && <ClassicLayout />}
            {template === 'minimal' && <MinimalLayout />}
        </>
    );
});
