import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Svg, Path, Polyline, Circle, Rect } from '@react-pdf/renderer';
import { ResumeData } from './ResumeGenerator';

// Register standard fonts
// Register standard fonts
// Font.register({
//     family: 'Lato',
//     fonts: [
//         { src: 'https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjx4wXiWtFCc.ttf' }, // Regular
//         { src: 'https://fonts.gstatic.com/s/lato/v20/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.ttf', fontWeight: 'bold' } // Bold
//     ]
// });

// --- COMMON STYLES ---
const stylesCommon = StyleSheet.create({
    watermark: {
        position: 'absolute',
        top: 300,
        left: 100,
        opacity: 0.15,
        transform: 'rotate(-45deg)',
    },
    watermarkText: {
        fontSize: 60,
        color: '#ff0000',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});

// --- STYLES FOR MODERN LAYOUT ---
const stylesModern = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#1e293b', // slate-800
        backgroundColor: '#ffffff',
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0', // slate-200
    },
    headerTop: {
        height: 8,
        backgroundColor: '#34d399', // emerald-400
        position: 'absolute',
        top: -40,
        left: -40,
        right: -40,
        width: '120%',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a', // slate-900
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    role: {
        fontSize: 14,
        color: '#059669', // emerald-600
        marginBottom: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
    },
    contactItem: {
        fontSize: 9,
        color: '#475569', // slate-600
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitleBar: {
        width: 30,
        height: 4,
        backgroundColor: '#10b981', // emerald-500
        marginRight: 6,
    },
    experienceItem: {
        marginBottom: 12,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#f1f5f9',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    roleTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    dateBadge: {
        fontSize: 8,
        color: '#059669',
        backgroundColor: '#ecfdf5',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 8,
    },
    companyName: {
        fontSize: 10,
        color: '#334155',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 9,
        color: '#475569',
        textAlign: 'justify',
        lineHeight: 1.4,
    },
    grid: {
        flexDirection: 'row',
        gap: 30,
    },
    colMain: {
        flex: 2,
    },
    colSide: {
        flex: 1,
    },
    skillBadge: {
        backgroundColor: '#1e293b',
        color: '#ffffff',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontSize: 9,
        marginRight: 4,
        marginBottom: 4,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    projectCard: {
        backgroundColor: '#f8fafc',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    techTag: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        color: '#64748b',
        fontSize: 7,
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 2,
        marginRight: 4,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    subSectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 4,
    }
});

// --- STYLES FOR CLASSIC LAYOUT (EXECUTIVE) ---
const stylesClassic = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#1A1A1A',
        backgroundColor: '#ffffff',
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 30,
        paddingBottom: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontFamily: 'Times-Roman',
        textTransform: 'uppercase',
        color: '#1A1A1A',
        marginBottom: 6,
        letterSpacing: 1,
    },
    role: {
        fontSize: 12,
        color: '#C5A059',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 3,
        fontWeight: 'bold',
    },
    divider: {
        width: 60,
        height: 1,
        backgroundColor: '#C5A059',
        marginBottom: 16,
        opacity: 0.6,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        rowGap: 8,
    },
    contactItem: {
        fontSize: 9,
        color: '#4A4A4A',
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        color: '#1A1A1A',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5E5',
        paddingBottom: 4,
    },
    experienceItem: {
        marginBottom: 16,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        alignItems: 'baseline',
    },
    roleTitle: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        color: '#1A1A1A',
    },
    dateDisplay: {
        fontSize: 9,
        color: '#C5A059',
        fontFamily: 'Times-Roman',
        fontStyle: 'italic',
    },
    companyName: {
        fontSize: 9,
        color: '#666666',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 10,
        color: '#4A4A4A',
        textAlign: 'justify',
        lineHeight: 1.6,
    },
    cols: {
        flexDirection: 'row',
        gap: 32,
    },
    leftCol: {
        flex: 1,
    },
    rightCol: {
        flex: 1,
    },
    skillText: {
        fontSize: 10,
        color: '#4A4A4A',
        lineHeight: 1.6,
    },
    link: {
        color: '#C5A059',
        textDecoration: 'none',
        fontSize: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    educationItem: {
        marginBottom: 12,
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eeeeee',
        borderStyle: 'dotted',
        paddingBottom: 2,
    }
});

// --- STYLES FOR MINIMAL LAYOUT ---
const stylesMinimal = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#000000',
        backgroundColor: '#ffffff',
        lineHeight: 1.4,
    },
    header: {
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
    },
    name: {
        fontSize: 32,
        fontWeight: 'heavy', // Force boldest
        letterSpacing: -1,
        color: '#000000',
        marginBottom: 4,
    },
    role: {
        fontSize: 11,
        color: '#666666',
        textTransform: 'uppercase',
        letterSpacing: 3,
        marginBottom: 12,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    contactText: {
        fontSize: 9,
        color: '#000000',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 9,
        fontWeight: 'black',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#999999',
        marginBottom: 12,
    },
    experienceItem: {
        marginBottom: 20,
        paddingLeft: 12,
        borderLeftWidth: 1,
        borderLeftColor: '#eeeeee',
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        left: -14.5, // Center on 1px border
        top: 4,
        width: 4,
        height: 4,
        backgroundColor: '#000000',
        borderRadius: 2,
    },
    roleTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 2,
    },
    dateRange: {
        fontSize: 9,
        fontFamily: 'Courier', // Monospace for dates
        color: '#666666',
        marginBottom: 4,
    },
    companyName: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    description: {
        fontSize: 9,
        color: '#333333',
        lineHeight: 1.5,
    },
    cols: {
        flexDirection: 'row',
        gap: 30,
    },
    col: {
        flex: 1,
    }
});

interface ResumePDFProps {
    data: ResumeData;
    template?: 'modern' | 'classic' | 'minimal';
    isWatermarked?: boolean;
}

const Watermark = () => (
    <View style={stylesCommon.watermark} fixed>
        <Text style={stylesCommon.watermarkText}>SEM PAGAMENTO</Text>
        <Text style={[stylesCommon.watermarkText, { fontSize: 30, textAlign: 'center' }]}>PREVIEW</Text>
    </View>
);

export const ResumePDF = ({ data, template = 'modern', isWatermarked = false }: ResumePDFProps) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        if (year && month) {
            return `${month}/${year}`;
        }
        return dateString;
    };

    // --- RENDER FUNCTIONS ---

    // 1. MODERN LAYOUT RENDERER
    const renderModern = () => (
        <Page size="A4" style={stylesModern.page}>
            {isWatermarked && <Watermark />}
            <View style={stylesModern.headerTop} />

            <View style={stylesModern.header}>
                <Text style={stylesModern.name}>{data.personal.fullName || 'Seu Nome'}</Text>
                <Text style={stylesModern.role}>{data.personal.role || 'Seu Cargo'}</Text>

                <View style={stylesModern.contactRow}>
                    {data.personal.email && <View style={stylesModern.contactItem}><Text>{data.personal.email}</Text></View>}
                    {data.personal.phone && <View style={stylesModern.contactItem}><Text>•  {data.personal.phone}</Text></View>}
                    {data.personal.location && <View style={stylesModern.contactItem}><Text>•  {data.personal.location}</Text></View>}
                    {data.personal.linkedin && <View style={stylesModern.contactItem}><Text>•  linkedin.com</Text></View>}
                </View>
            </View>

            <View style={stylesModern.grid}>
                <View style={stylesModern.colMain}>
                    {data.personal.summary && (
                        <View style={stylesModern.section}>
                            <View style={stylesModern.sectionTitle}>
                                <View style={stylesModern.sectionTitleBar} />
                                <Text>Resumo</Text>
                            </View>
                            <Text style={stylesModern.description}>{data.personal.summary}</Text>
                        </View>
                    )}

                    {data.experience.length > 0 && (
                        <View style={stylesModern.section}>
                            <View style={stylesModern.sectionTitle}>
                                <View style={stylesModern.sectionTitleBar} />
                                <Text>Experiência</Text>
                            </View>
                            {data.experience.map(exp => (
                                <View key={exp.id} style={stylesModern.experienceItem}>
                                    <View style={stylesModern.rowBetween}>
                                        <Text style={stylesModern.roleTitle}>{exp.role}</Text>
                                        <Text style={stylesModern.dateBadge}>{formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}</Text>
                                    </View>
                                    <Text style={stylesModern.companyName}>{exp.company}</Text>
                                    <Text style={stylesModern.description}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.projects.length > 0 && (
                        <View style={stylesModern.section}>
                            <View style={stylesModern.sectionTitle}>
                                <View style={stylesModern.sectionTitleBar} />
                                <Text>Projetos</Text>
                            </View>
                            {data.projects.map(proj => (
                                <View key={proj.id} style={stylesModern.projectCard}>
                                    <Text style={[stylesModern.roleTitle, { fontSize: 10 }]}>{proj.name}</Text>
                                    <Text style={[stylesModern.description, { marginBottom: 4 }]}>{proj.description}</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {proj.technologies.slice(0, 5).map((t, i) => (
                                            <Text key={i} style={stylesModern.techTag}>{t}</Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={stylesModern.colSide}>
                    {data.skills.length > 0 && (
                        <View style={stylesModern.section}>
                            <Text style={stylesModern.subSectionTitle}>Competências</Text>
                            <View style={stylesModern.skillsContainer}>
                                {data.skills.map((s, i) => (
                                    <Text key={i} style={stylesModern.skillBadge}>{s}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {data.education.length > 0 && (
                        <View style={stylesModern.section}>
                            <Text style={stylesModern.subSectionTitle}>Educação</Text>
                            {data.education.map(edu => (
                                <View key={edu.id} style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{edu.institution}</Text>
                                    <Text style={{ fontSize: 9 }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: 8, color: '#64748b' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.languages.length > 0 && (
                        <View style={stylesModern.section}>
                            <Text style={stylesModern.subSectionTitle}>Idiomas</Text>
                            {data.languages.map(lang => (
                                <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <Text style={{ fontSize: 9 }}>{lang.language}</Text>
                                    <Text style={{ fontSize: 9, color: '#64748b' }}>{lang.level}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </Page>
    );

    // 2. CLASSIC LAYOUT RENDERER
    const renderClassic = () => (
        <Page size="A4" style={stylesClassic.page}>
            {isWatermarked && <Watermark />}
            <View style={stylesClassic.header}>
                <Text style={stylesClassic.name}>{data.personal.fullName || 'Seu Nome'}</Text>
                <Text style={stylesClassic.role}>{data.personal.role || 'Seu Cargo'}</Text>

                <View style={stylesClassic.divider} />

                <View style={stylesClassic.contactRow}>
                    {data.personal.email && (
                        <View style={stylesClassic.contactItem}>
                            <Text>{data.personal.email}</Text>
                        </View>
                    )}
                    {data.personal.phone && (
                        <View style={stylesClassic.contactItem}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#C5A059', marginRight: 6 }} />
                            <Text>{data.personal.phone}</Text>
                        </View>
                    )}
                    {data.personal.location && (
                        <View style={stylesClassic.contactItem}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#C5A059', marginRight: 6 }} />
                            <Text>{data.personal.location}</Text>
                        </View>
                    )}
                    {data.personal.linkedin && (
                        <View style={stylesClassic.contactItem}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#C5A059', marginRight: 6 }} />
                            <Text>{data.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View>
                {data.personal.summary && (
                    <View style={stylesClassic.section}>
                        <Text style={stylesClassic.sectionTitle}>Resumo Profissional</Text>
                        <Text style={stylesClassic.description}>{data.personal.summary}</Text>
                    </View>
                )}

                {data.experience.length > 0 && (
                    <View style={stylesClassic.section}>
                        <Text style={stylesClassic.sectionTitle}>Experiência</Text>
                        {data.experience.map(exp => (
                            <View key={exp.id} style={stylesClassic.experienceItem}>
                                <View style={stylesClassic.rowBetween}>
                                    <Text style={stylesClassic.roleTitle}>{exp.role}</Text>
                                    <Text style={stylesClassic.dateDisplay}>
                                        {formatDate(exp.startDate)} — {exp.current ? 'Presente' : formatDate(exp.endDate)}
                                    </Text>
                                </View>
                                <Text style={stylesClassic.companyName}>{exp.company}</Text>
                                <Text style={stylesClassic.description}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={stylesClassic.cols}>
                    <View style={stylesClassic.leftCol}>
                        {data.projects.length > 0 && (
                            <View style={stylesClassic.section}>
                                <Text style={stylesClassic.sectionTitle}>Projetos de Impacto</Text>
                                {data.projects.map(proj => (
                                    <View key={proj.id} style={stylesClassic.experienceItem}>
                                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 2 }}>
                                            <Text style={[stylesClassic.roleTitle, { fontSize: 11 }]}>{proj.name}</Text>
                                            {proj.link && (
                                                <Link src={proj.link} style={stylesClassic.link}>LINK ↗</Link>
                                            )}
                                        </View>
                                        <Text style={[stylesClassic.description, { marginBottom: 4 }]}>{proj.description}</Text>
                                        <Text style={[stylesClassic.dateDisplay, { fontSize: 8, color: '#888' }]}>
                                            {proj.technologies.join(' • ')}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={stylesClassic.rightCol}>
                        {data.education.length > 0 && (
                            <View style={stylesClassic.section}>
                                <Text style={stylesClassic.sectionTitle}>Educação</Text>
                                {data.education.map(edu => (
                                    <View key={edu.id} style={stylesClassic.educationItem}>
                                        <Text style={[stylesClassic.roleTitle, { fontSize: 11 }]}>{edu.institution}</Text>
                                        <Text style={[stylesClassic.description, { fontSize: 10, fontStyle: 'italic', color: '#444' }]}>{edu.degree} em {edu.field}</Text>
                                        <Text style={[stylesClassic.dateDisplay, { fontSize: 9, marginTop: 2 }]}>
                                            {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {data.skills.length > 0 && (
                            <View style={stylesClassic.section}>
                                <Text style={stylesClassic.sectionTitle}>Competências</Text>
                                <Text style={stylesClassic.skillText}>
                                    {data.skills.join(' • ')}
                                </Text>
                            </View>
                        )}

                        {data.languages.length > 0 && (
                            <View style={stylesClassic.section}>
                                <Text style={stylesClassic.sectionTitle}>Idiomas</Text>
                                {data.languages.map(lang => (
                                    <View key={lang.id} style={stylesClassic.languageRow}>
                                        <Text style={{ fontSize: 10, color: '#333' }}>{lang.language}</Text>
                                        <Text style={{ fontSize: 10, color: '#777', fontFamily: 'Times-Roman', fontStyle: 'italic' }}>{lang.level}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Page>
    );

    // 3. MINIMAL LAYOUT RENDERER
    const renderMinimal = () => (
        <Page size="A4" style={stylesMinimal.page}>
            {isWatermarked && <Watermark />}
            <View style={stylesMinimal.header}>
                <Text style={stylesMinimal.name}>{data.personal.fullName || 'Seu Nome'}</Text>
                <Text style={stylesMinimal.role}>{data.personal.role || 'Seu Cargo'}</Text>

                <View style={stylesMinimal.contactRow}>
                    {data.personal.email && <Text style={stylesMinimal.contactText}>{data.personal.email}   •   </Text>}
                    {data.personal.phone && <Text style={stylesMinimal.contactText}>{data.personal.phone}   •   </Text>}
                    {data.personal.location && <Text style={stylesMinimal.contactText}>{data.personal.location}</Text>}
                </View>
            </View>

            <View>
                {data.personal.summary && (
                    <View style={{ marginBottom: 24 }}>
                        <Text style={stylesMinimal.sectionTitle}>Sobre</Text>
                        <Text style={stylesMinimal.description}>{data.personal.summary}</Text>
                    </View>
                )}

                {data.experience.length > 0 && (
                    <View style={{ marginBottom: 24 }}>
                        <Text style={stylesMinimal.sectionTitle}>Experiência</Text>
                        {data.experience.map(exp => (
                            <View key={exp.id} style={stylesMinimal.experienceItem}>
                                <View style={stylesMinimal.dot} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <Text style={stylesMinimal.roleTitle}>{exp.role}</Text>
                                    <Text style={stylesMinimal.dateRange}>{formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}</Text>
                                </View>
                                <Text style={stylesMinimal.companyName}>{exp.company}</Text>
                                <Text style={stylesMinimal.description}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={stylesMinimal.cols}>
                    <View style={stylesMinimal.col}>
                        {data.education.length > 0 && (
                            <View style={{ marginBottom: 24 }}>
                                <Text style={stylesMinimal.sectionTitle}>Educação</Text>
                                {data.education.map(edu => (
                                    <View key={edu.id} style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{edu.institution}</Text>
                                        <Text style={{ fontSize: 10 }}>{edu.degree} em {edu.field}</Text>
                                        <Text style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        {data.languages.length > 0 && (
                            <View style={{ marginBottom: 24 }}>
                                <Text style={stylesMinimal.sectionTitle}>Idiomas</Text>
                                {data.languages.map(lang => (
                                    <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 2, marginBottom: 2 }}>
                                        <Text style={{ fontSize: 10 }}>{lang.language}</Text>
                                        <Text style={{ fontSize: 10, color: '#666' }}>{lang.level}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={stylesMinimal.col}>
                        {data.skills.length > 0 && (
                            <View style={{ marginBottom: 24 }}>
                                <Text style={stylesMinimal.sectionTitle}>Skills</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {data.skills.map((s, i) => (
                                        <Text key={i} style={{ fontSize: 10, marginRight: 8, marginBottom: 4, fontWeight: 'bold' }}>{s}</Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {data.projects.length > 0 && (
                            <View style={{ marginBottom: 24 }}>
                                <Text style={stylesMinimal.sectionTitle}>Projetos</Text>
                                {data.projects.map(proj => (
                                    <View key={proj.id} style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{proj.name}</Text>
                                        <Text style={{ fontSize: 9, color: '#333' }}>{proj.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Page>
    );

    return (
        <Document>
            {template === 'modern' && renderModern()}
            {template === 'classic' && renderClassic()}
            {template === 'minimal' && renderMinimal()}
        </Document>
    );
};
