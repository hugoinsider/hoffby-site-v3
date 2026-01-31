
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Svg, Path, Polyline, Circle, Rect } from '@react-pdf/renderer';
import { ResumeData } from './ResumeGenerator';

// Register fonts if needed (using default Helvetica for now which is standard safe)
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#334155', // slate-700
        backgroundColor: '#ffffff',
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#1e293b', // slate-800
        paddingBottom: 20,
    },
    name: {
        fontSize: 30, // text-4xl
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a', // slate-900
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    role: {
        fontSize: 14, // text-xl
        color: '#475569', // slate-600
        marginBottom: 16,
        fontWeight: 'medium',
        textTransform: 'none',
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        rowGap: 8,
    },
    contactItem: {
        fontSize: 10,
        color: '#475569', // slate-600
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 10,
        height: 10,
        marginRight: 6,
    },
    cols: {
        flexDirection: 'row',
        gap: 32,
    },
    leftCol: {
        flex: 1,
        paddingRight: 10,
    },
    rightCol: {
        width: '32%',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#94a3b8', // slate-400
        marginBottom: 12,
        letterSpacing: 2.5,
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
        fontWeight: 'bold',
        color: '#0f172a', // slate-900
    },
    dateDisplay: {
        fontSize: 9,
        color: '#64748b', // slate-500
        fontWeight: 'medium',
    },
    companyName: {
        fontSize: 10,
        color: '#334155', // slate-700
        marginBottom: 4,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 10,
        color: '#475569', // slate-600
        textAlign: 'left',
        lineHeight: 1.5,
    },
    skillBadge: {
        backgroundColor: '#f1f5f9', // slate-100
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 9,
        marginBottom: 4,
        color: '#334155', // slate-700
        textAlign: 'center',
    },
    skillsContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 4,
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a', // slate-900
    },
    link: {
        color: '#059669', // emerald-600
        textDecoration: 'none',
        fontSize: 8,
        marginLeft: 4,
    },
    educationItem: {
        marginBottom: 12,
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
});

// SVG Icons Setup - Explicit fill="none" to prevent black blobs
const MailIcon = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Polyline points="22,6 12,13 2,6" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const PhoneIcon = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const MapPinIcon = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="12" cy="10" r="3" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const LinkedinIcon = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="2" y="9" width="4" height="12" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="4" cy="4" r="2" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const GithubIcon = () => (
    <Svg viewBox="0 0 24 24" style={styles.icon}>
        <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="#64748b" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

interface ResumePDFProps {
    data: ResumeData;
}

export const ResumePDF = ({ data }: ResumePDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{data.personal.fullName || 'Seu Nome'}</Text>
                <Text style={styles.role}>{data.personal.role || 'Seu Cargo'}</Text>

                <View style={styles.contactRow}>
                    {data.personal.email && (
                        <View style={styles.contactItem}>
                            <MailIcon />
                            <Text>{data.personal.email}</Text>
                        </View>
                    )}
                    {data.personal.phone && (
                        <View style={styles.contactItem}>
                            <PhoneIcon />
                            <Text>{data.personal.phone}</Text>
                        </View>
                    )}
                    {data.personal.location && (
                        <View style={styles.contactItem}>
                            <MapPinIcon />
                            <Text>{data.personal.location}</Text>
                        </View>
                    )}
                    {data.personal.linkedin && (
                        <View style={styles.contactItem}>
                            <LinkedinIcon />
                            <Text>{data.personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</Text>
                        </View>
                    )}
                    {data.personal.github && (
                        <View style={styles.contactItem}>
                            <GithubIcon />
                            <Text>github.com/{data.personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</Text>
                        </View>
                    )}
                </View>
            </View>


            <View style={styles.cols}>
                {/* Left Column (Main) */}
                <View style={styles.leftCol}>
                    {data.personal.summary && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Resumo</Text>
                            <Text style={styles.description}>{data.personal.summary}</Text>
                        </View>
                    )}

                    {data.experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { marginTop: 5 }]}>Experiência Profissional</Text>
                            {data.experience.map(exp => (
                                <View key={exp.id} style={styles.experienceItem}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.roleTitle}>{exp.role}</Text>
                                        <Text style={styles.dateDisplay}>
                                            {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                        <Text style={styles.companyName}>{exp.company}</Text>
                                        {exp.workMode && (
                                            <Text style={[styles.skillBadge, { fontSize: 7, marginLeft: 6 }]}>{exp.workMode}</Text>
                                        )}
                                    </View>
                                    <Text style={styles.description}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.projects.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Projetos</Text>
                            {data.projects.map(proj => (
                                <View key={proj.id} style={styles.experienceItem}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.projectTitle}>
                                            {proj.name}
                                            {proj.link && (
                                                <Link src={proj.link} style={styles.link}>[Ver projeto]</Link>
                                            )}
                                        </Text>
                                    </View>
                                    <Text style={[styles.description, { marginBottom: 4 }]}>{proj.description}</Text>
                                    <View style={styles.skillsRow}>
                                        {proj.technologies.map((tech, i) => (
                                            <Text key={i} style={styles.skillBadge}>{tech}</Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Right Column (Sidebar) */}
                <View style={styles.rightCol}>
                    {data.skills.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Habilidades</Text>
                            <View style={styles.skillsContainer}>
                                {data.skills.map((skill, i) => (
                                    <Text key={i} style={styles.skillBadge}>{skill}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {data.education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { marginTop: 5 }]}>Formação</Text>
                            {data.education.map(edu => (
                                <View key={edu.id} style={styles.educationItem}>
                                    <Text style={[styles.roleTitle, { fontSize: 10 }]}>{edu.institution}</Text>
                                    <Text style={[styles.description, { fontSize: 9, marginBottom: 1 }]}>{edu.degree} em {edu.field}</Text>
                                    <Text style={[styles.dateDisplay, { fontSize: 8 }]}>
                                        {edu.startDate} - {edu.endDate}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.languages.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Idiomas</Text>
                            {data.languages.map(lang => (
                                <View key={lang.id} style={styles.languageRow}>
                                    <Text style={[styles.description, { fontWeight: 'bold' }]}>{lang.language}</Text>
                                    <Text style={styles.dateDisplay}>{lang.level}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </Page>
    </Document>
);
