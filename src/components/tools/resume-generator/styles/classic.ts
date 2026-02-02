import { StyleSheet } from '@react-pdf/renderer';

// --- STYLES FOR CLASSIC LAYOUT (EXECUTIVE) ---
export const stylesClassic = StyleSheet.create({
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
        marginBottom: 20,
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
        lineHeight: 1.1,
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
