import { StyleSheet } from '@react-pdf/renderer';

// --- STYLES FOR MINIMAL LAYOUT ---
export const stylesMinimal = StyleSheet.create({
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
        marginBottom: 30,
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
