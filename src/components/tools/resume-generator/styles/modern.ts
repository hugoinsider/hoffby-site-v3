import { StyleSheet } from '@react-pdf/renderer';

// --- STYLES FOR MODERN LAYOUT ---
export const stylesModern = StyleSheet.create({
    page: {
        padding: 50, // Increased padding
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#334155', // slate-700
        backgroundColor: '#ffffff',
        lineHeight: 1.6,
    },
    header: {
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cbd5e1', // slate-300
    },
    headerTop: {
        height: 6,
        backgroundColor: '#10b981', // emerald-500
        position: 'absolute',
        top: -50,
        left: -50,
        right: -50,
        width: '125%',
    },
    name: {
        fontSize: 32, // Larger name
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a', // slate-900
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    role: {
        fontSize: 14,
        color: '#059669', // emerald-600
        marginBottom: 20,
        fontWeight: 'medium',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16, // More gap
        marginTop: 8,
    },
    contactItem: {
        fontSize: 9,
        color: '#475569', // slate-600
        flexDirection: 'row',
        alignItems: 'center',
        lineHeight: 1.1,
    },
    icon: {
        width: 10,
        height: 10,
        marginRight: 6,
        color: '#64748b'
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a',
        marginBottom: 12, // More space below title
        flexDirection: 'row',
        alignItems: 'center',
        letterSpacing: 0.5
    },
    sectionTitleBar: {
        width: 24,
        height: 3,
        backgroundColor: '#10b981', // emerald-500
        marginRight: 8,
        borderRadius: 1.5
    },
    experienceItem: {
        marginBottom: 16,
        paddingLeft: 16,
        borderLeftWidth: 2,
        borderLeftColor: '#e2e8f0',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Better alignment
        marginBottom: 4,
    },
    roleTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    dateBadge: {
        fontSize: 8,
        color: '#047857',
        backgroundColor: '#d1fae5',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 12,
        fontWeight: 'bold',
        lineHeight: 1.1,
    },
    companyName: {
        fontSize: 10,
        color: '#475569',
        fontWeight: 'bold',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 10,
        color: '#475569',
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    grid: {
        flexDirection: 'row',
        gap: 40, // Wider gap
    },
    colMain: {
        flex: 1.8,
    },
    colSide: {
        flex: 1,
    },
    skillBadge: {
        backgroundColor: '#f1f5f9',
        color: '#334155',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 9,
        marginRight: 6,
        marginBottom: 6,
        fontWeight: 'medium'
    },
    skillBadgeText: {
        fontSize: 9,
        fontWeight: 'medium',
        lineHeight: 1.1,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    projectCard: {
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 6,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    techTag: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        color: '#64748b',
        fontSize: 7,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 4,
        marginTop: 4,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        lineHeight: 0.8,
    },
    subSectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#334155',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 4,
        letterSpacing: 0.5
    }
});
