import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Svg, Path, Polyline, Circle, Rect } from '@react-pdf/renderer';
import { ResumeData } from './ResumeGenerator';

import { stylesCommon, Icons } from './styles/common';
import { stylesModern } from './styles/modern';
import { stylesClassic } from './styles/classic';
import { stylesMinimal } from './styles/minimal';

// Register standard fonts
// Font.register({
//     family: 'Lato',
//     fonts: [
//         { src: 'https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjx4wXiWtFCc.ttf' }, // Regular
//         { src: 'https://fonts.gstatic.com/s/lato/v20/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.ttf', fontWeight: 'bold' } // Bold
//     ]
// });

interface ResumePDFProps {
    data: ResumeData;
    template?: 'modern' | 'classic' | 'minimal';
    isWatermarked?: boolean;
}

const Watermark = () => (
    <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1000,
        opacity: 0.08,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        transform: 'rotate(-45deg) scale(1.5)',
        alignContent: 'center',
        justifyContent: 'center',
        height: '150%', // Extend height to cover rotation
        width: '150%',  // Extend width to cover rotation
        marginTop: '-25%', // Center after extending
        marginLeft: '-25%'
    }} fixed>
        {Array.from({ length: 40 }).map((_, i) => (
            <Text key={i} style={{
                fontSize: 24,
                color: '#1e293b',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                margin: 20,
                width: '100%',
                textAlign: 'center'
            }}>
                HOFFBY PREVIEW   •   SEM PAGAMENTO   •   HOFFBY PREVIEW
            </Text>
        ))}
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

    // 4. HELPER: Icon Component
    const Icon = ({ path, color = '#64748b', size = 10 }: { path: string, color?: string, size?: number }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
            <Path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );

    // 1. MODERN LAYOUT RENDERER
    const renderModern = () => (
        <Page size="A4" style={stylesModern.page}>
            {isWatermarked && <Watermark />}
            <View style={stylesModern.headerTop} />

            <View style={stylesModern.header}>
                <Text style={stylesModern.name}>{data.personal.fullName || 'Seu Nome'}</Text>
                <Text style={stylesModern.role}>{data.personal.role || 'Seu Cargo'}</Text>

                <View style={stylesModern.contactRow}>
                    {data.personal.email && (
                        <View style={stylesModern.contactItem}>
                            <Icon path={Icons.Mail} />
                            <Text>{data.personal.email}</Text>
                        </View>
                    )}
                    {data.personal.phone && (
                        <View style={stylesModern.contactItem}>
                            <Icon path={Icons.Phone} />
                            <Text>{data.personal.phone}</Text>
                        </View>
                    )}
                    {data.personal.location && (
                        <View style={stylesModern.contactItem}>
                            <Icon path={Icons.MapPin} />
                            <Text>{data.personal.location}</Text>
                        </View>
                    )}
                    {data.personal.linkedin && (
                        <View style={stylesModern.contactItem}>
                            <Icon path={Icons.Linkedin} />
                            <Text>{data.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</Text>
                        </View>
                    )}
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                        <Text style={[stylesModern.roleTitle, { fontSize: 11, flex: 1 }]}>{proj.name}</Text>
                                        {proj.link && (
                                            <Link src={proj.link} style={{ flexDirection: 'row', alignItems: 'center', textDecoration: 'none' }}>
                                                <Text style={{ fontSize: 9, color: '#10b981' }}>LINK ↗</Text>
                                            </Link>
                                        )}
                                    </View>
                                    <Text style={[stylesModern.description, { marginBottom: 8 }]}>{proj.description}</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {proj.technologies.slice(0, 6).map((t, i) => (
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
                                    <View key={i} style={stylesModern.skillBadge}>
                                        <Text style={stylesModern.skillBadgeText}>
                                            {s}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data.education.length > 0 && (
                        <View style={stylesModern.section}>
                            <Text style={stylesModern.subSectionTitle}>Educação</Text>
                            {data.education.map(edu => (
                                <View key={edu.id} style={{ marginBottom: 12 }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0f172a' }}>{edu.institution}</Text>
                                    <Text style={{ fontSize: 9, color: '#334155' }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#64748b' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.languages.length > 0 && (
                        <View style={stylesModern.section}>
                            <Text style={stylesModern.subSectionTitle}>Idiomas</Text>
                            {data.languages.map(lang => (
                                <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <Text style={{ fontSize: 10, color: '#334155' }}>{lang.language}</Text>
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
