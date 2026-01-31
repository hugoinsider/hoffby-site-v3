import React from 'react';
import { ResumeData } from './ResumeGenerator';
import { Plus, Trash } from 'lucide-react';
import { MonthYearPicker } from './MonthYearPicker';

interface ResumeFormProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
    step: number;
}

export function ResumeForm({ data, onChange, step }: ResumeFormProps) {
    const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
        onChange({
            ...data,
            personal: { ...data.personal, [field]: value }
        });
    };

    const addExperience = () => {
        onChange({
            ...data,
            experience: [
                ...data.experience,
                {
                    id: crypto.randomUUID(),
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: ''
                }
            ]
        });
    };

    const updateExperience = (id: string, field: keyof ResumeData['experience'][0], value: any) => {
        onChange({
            ...data,
            experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        });
    };

    const removeExperience = (id: string) => {
        onChange({
            ...data,
            experience: data.experience.filter(exp => exp.id !== id)
        });
    };

    // Phone Mask Helper
    const formatPhone = (value: string) => {
        // Remove non-digits
        const digits = value.replace(/\D/g, '');
        // Limit to 11 digits
        const limited = digits.substring(0, 11);

        // Apply mask: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
        if (limited.length > 2) {
            let formatted = `(${limited.substring(0, 2)}) `;
            if (limited.length > 7) {
                formatted += `${limited.substring(2, 7)}-${limited.substring(7)}`;
            } else {
                formatted += limited.substring(2);
            }
            return formatted;
        }
        return limited;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formatted = formatPhone(value);
        updatePersonal('phone', formatted);
    };

    // Helper inputs styles
    const inputClass = "w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700 shadow-inner";
    const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 ml-1";

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

            {/* Personal Info */}
            {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start gap-3 mb-2">
                        <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mt-0.5">
                            <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Preencha seus dados principais com atenção. O e-mail e LinkedIn são essenciais para recrutadores.
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>Nome Completo</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={data.personal.fullName}
                            onChange={(e) => updatePersonal('fullName', e.target.value)}
                            placeholder="Ex: Ana Silva"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Cargo / Título</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={data.personal.role}
                            onChange={(e) => updatePersonal('role', e.target.value)}
                            placeholder="Ex: Full Stack Developer"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Email</label>
                        <input
                            type="email"
                            className={inputClass}
                            value={data.personal.email}
                            onChange={(e) => updatePersonal('email', e.target.value)}
                            placeholder="email@exemplo.com"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Telefone</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={data.personal.phone}
                            onChange={handlePhoneChange}
                            maxLength={15}
                            placeholder="(11) 99999-9999"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>LinkedIn</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={data.personal.linkedin}
                            onChange={(e) => updatePersonal('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Localização</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={data.personal.location}
                            onChange={(e) => updatePersonal('location', e.target.value)}
                            placeholder="São Paulo, SP"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelClass}>Resumo Profissional</label>
                        <textarea
                            className={`${inputClass} min-h-[140px] resize-y`}
                            value={data.personal.summary}
                            onChange={(e) => updatePersonal('summary', e.target.value)}
                            placeholder="Breve resumo sobre suas qualificações, anos de experiência e principais objetivos profissionais..."
                        />
                    </div>
                </div>
            )}

            {/* Experience */}
            {step === 1 && (
                <div>
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={addExperience}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-bold uppercase hover:bg-emerald-500/20 transition-all border border-emerald-500/20 hover:border-emerald-500/40"
                        >
                            <Plus size={16} /> Adicionar Experiência
                        </button>
                    </div>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={exp.id} className="bg-[#0A0A0A] rounded-2xl p-6 md:p-8 border border-white/5 relative group animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="absolute -left-[1px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />

                                <button
                                    onClick={() => removeExperience(exp.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                    title="Remover Experiência"
                                >
                                    <Trash size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Nome da Empresa</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={exp.company}
                                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                            autoFocus={index === data.experience.length - 1} // Autofocus on newly added item
                                            placeholder="Ex: Google, Microsoft, Startup X"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Cargo</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={exp.role}
                                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                            placeholder="Ex: Senior Frontend Engineer"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <MonthYearPicker
                                                label="Início"
                                                value={exp.startDate}
                                                onChange={(val) => updateExperience(exp.id, 'startDate', val)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <MonthYearPicker
                                                label="Fim"
                                                value={exp.endDate}
                                                onChange={(val) => updateExperience(exp.id, 'endDate', val)}
                                                disabled={exp.current}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className={labelClass}>Modalidade</label>
                                            <select
                                                className={inputClass}
                                                value={exp.workMode || ''}
                                                onChange={(e) => updateExperience(exp.id, 'workMode', e.target.value)}
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Presencial">Presencial</option>
                                                <option value="Remoto">Remoto</option>
                                                <option value="Híbrido">Híbrido</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 flex items-end">
                                            <label className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group/check w-full h-[50px]"> {/* matched height */}
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${exp.current ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 bg-transparent'}`}>
                                                    {exp.current && <span className="block w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={exp.current}
                                                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                                    className="hidden"
                                                />
                                                <span className="text-sm font-medium text-slate-300 group-hover/check:text-white">Trabalho Atual</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Descrição das Atividades</label>
                                        <textarea
                                            className={`${inputClass} min-h-[120px]`}
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                            placeholder="• Liderou equipe de 5 desenvolvedores&#10;• Reduziu latência da API em 40%&#10;• Implementou CI/CD..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.experience.length === 0 && (
                            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-slate-600">
                                    <Plus size={32} />
                                </div>
                                <p className="text-slate-400 mb-6 max-w-xs mx-auto">Adicione suas experiências profissionais para destacar sua carreira.</p>
                                <button onClick={addExperience} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/20">
                                    Adicionar Primeira Experiência
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Education */}
            {step === 2 && (
                <div>
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => onChange({
                                ...data,
                                education: [
                                    ...data.education,
                                    {
                                        id: crypto.randomUUID(),
                                        institution: '',
                                        degree: '',
                                        field: '',
                                        startDate: '',
                                        endDate: ''
                                    }
                                ]
                            })}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-bold uppercase hover:bg-cyan-500/20 transition-all border border-cyan-500/20 hover:border-cyan-500/40"
                        >
                            <Plus size={16} /> Adicionar Formação
                        </button>
                    </div>

                    <div className="space-y-6">
                        {data.education.map((edu, index) => (
                            <div key={edu.id} className="bg-[#0A0A0A] rounded-2xl p-6 md:p-8 border border-white/5 relative group animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="absolute -left-[1px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />

                                <button
                                    onClick={() => onChange({ ...data, education: data.education.filter(e => e.id !== edu.id) })}
                                    className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                >
                                    <Trash size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Instituição de Ensino</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={edu.institution}
                                            onChange={(e) => onChange({
                                                ...data,
                                                education: data.education.map(item => item.id === edu.id ? { ...item, institution: e.target.value } : item)
                                            })}
                                            autoFocus={index === data.education.length - 1}
                                            placeholder="Ex: USP, Harvard, Udemy"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Grau / Tipo</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={edu.degree}
                                            placeholder="Bacharelado, Curso Técnico..."
                                            onChange={(e) => onChange({
                                                ...data,
                                                education: data.education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item)
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Área de Estudo</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={edu.field}
                                            placeholder="Ciência da Computação"
                                            onChange={(e) => onChange({
                                                ...data,
                                                education: data.education.map(item => item.id === edu.id ? { ...item, field: e.target.value } : item)
                                            })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <MonthYearPicker
                                                label="Início"
                                                value={edu.startDate}
                                                onChange={(val) => onChange({
                                                    ...data,
                                                    education: data.education.map(item => item.id === edu.id ? { ...item, startDate: val } : item)
                                                })}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <MonthYearPicker
                                                label="Fim (Previsão)"
                                                value={edu.endDate}
                                                onChange={(val) => onChange({
                                                    ...data,
                                                    education: data.education.map(item => item.id === edu.id ? { ...item, endDate: val } : item)
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.education.length === 0 && (
                            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-slate-600">
                                    <Plus size={32} />
                                </div>
                                <p className="text-slate-400 mb-6">Adicione sua formação acadêmica, cursos e certificações.</p>
                                <button onClick={() => onChange({
                                    ...data,
                                    education: [
                                        ...data.education,
                                        {
                                            id: crypto.randomUUID(),
                                            institution: '',
                                            degree: '',
                                            field: '',
                                            startDate: '',
                                            endDate: ''
                                        }
                                    ]
                                })} className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/20">
                                    Adicionar Formação
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Projects */}
            {step === 3 && (
                <div>
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => onChange({
                                ...data,
                                projects: [
                                    ...data.projects,
                                    {
                                        id: crypto.randomUUID(),
                                        name: '',
                                        description: '',
                                        technologies: [],
                                        link: ''
                                    }
                                ]
                            })}
                            className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 text-pink-400 rounded-lg text-sm font-bold uppercase hover:bg-pink-500/20 transition-all border border-pink-500/20 hover:border-pink-500/40"
                        >
                            <Plus size={16} /> Adicionar Projeto
                        </button>
                    </div>

                    <div className="space-y-6">
                        {data.projects.map((proj, index) => (
                            <div key={proj.id} className="bg-[#0A0A0A] rounded-2xl p-6 md:p-8 border border-white/5 relative group animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="absolute -left-[1px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-pink-500/0 via-pink-500/50 to-pink-500/0 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />

                                <button
                                    onClick={() => onChange({ ...data, projects: data.projects.filter(p => p.id !== proj.id) })}
                                    className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                >
                                    <Trash size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>Nome do Projeto</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={proj.name}
                                            onChange={(e) => onChange({
                                                ...data,
                                                projects: data.projects.map(item => item.id === proj.id ? { ...item, name: e.target.value } : item)
                                            })}
                                            autoFocus={index === data.projects.length - 1}
                                            placeholder="Ex: E-commerce App"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Link (Opcional)</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={proj.link}
                                            onChange={(e) => onChange({
                                                ...data,
                                                projects: data.projects.map(item => item.id === proj.id ? { ...item, link: e.target.value } : item)
                                            })}
                                            placeholder="github.com/..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Tecnologias (separadas por vírgula)</label>
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={proj.technologies.join(', ')}
                                            onChange={(e) => onChange({
                                                ...data,
                                                projects: data.projects.map(item => item.id === proj.id ? { ...item, technologies: e.target.value.split(',').map(t => t.trim()) } : item)
                                            })}
                                            placeholder="React, Node.js, MongoDB"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Descrição do Projeto</label>
                                        <textarea
                                            className={`${inputClass} min-h-[100px]`}
                                            value={proj.description}
                                            onChange={(e) => onChange({
                                                ...data,
                                                projects: data.projects.map(item => item.id === proj.id ? { ...item, description: e.target.value } : item)
                                            })}
                                            placeholder="O que o projeto faz e quais problemas resolve..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.projects.length === 0 && (
                            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-slate-600">
                                    <Plus size={32} />
                                </div>
                                <p className="text-slate-400 mb-6">Destaque projetos pessoas ou freelancers.</p>
                                <button onClick={() => onChange({
                                    ...data,
                                    projects: [
                                        ...data.projects,
                                        {
                                            id: crypto.randomUUID(),
                                            name: '',
                                            description: '',
                                            technologies: [],
                                            link: ''
                                        }
                                    ]
                                })} className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-pink-500/20">
                                    Adicionar Projeto
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Skills */}
            {step === 4 && (
                <div>
                    <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl mb-8">
                        <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            Dica Importante
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Liste as tecnologias que você domina. Tente agrupar por categorias mentalmente (Frontend, Backend, Tools) ou liste por ordem de proficiência.
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>Lista de Habilidades (separadas por vírgula)</label>
                        <textarea
                            className={`${inputClass} min-h-[200px] text-lg leading-relaxed`}
                            value={data.skills.join(', ')}
                            onChange={(e) => onChange({ ...data, skills: e.target.value.split(',').map(s => s.trim()) })}
                            placeholder="Ex: JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS, Git..."
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
