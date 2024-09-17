import { StyleSheet } from '@react-pdf/renderer'; 

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 30,
      fontFamily: 'Roboto',
    },
    header: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    logoContainer: {
      width: 150,
      height: 50,
      marginRight: 20,
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    headerInfo: {
      flexGrow: 1,
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    companyDetails: {
      fontSize: 10,
      color: '#555555',
    },
    invoiceInfo: {
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    invoiceTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1a5f7a',
    },
    invoiceNumber: {
      fontSize: 12,
      fontWeight: 'medium',
    },
    invoiceDate: {
      fontSize: 10,
      color: '#555555',
    },
    clientInfo: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#1a5f7a',
    },
    clientDetail: {
      fontSize: 10,
      marginBottom: 2,
    },
    table: {
      display: 'table',
      width: 'auto',
      marginVertical: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      borderRadius: 5,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#1a5f7a',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#bfbfbf',
      borderBottomStyle: 'solid',
    },
    tableColSmall: {
      width: '8%',
      borderRightWidth: 1,
      borderRightColor: '#bfbfbf',
      padding: 5,
    },
    tableColMedium: {
      width: '15%',
      borderRightWidth: 1,
      borderRightColor: '#bfbfbf',
      padding: 5,
    },
    tableColLarge: {
      width: '32%',
      borderRightWidth: 1,
      borderRightColor: '#bfbfbf',
      padding: 5,
    },
    tableCellHeader: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    tableCell: {
      fontSize: 9,
      color: '#333333',
    },
    totals: {
      marginTop: 20,
      alignItems: 'flex-end',
    },
    totalsRow: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    totalsRowBold: {
      flexDirection: 'row',
      marginTop: 5,
      borderTopWidth: 1,
      borderTopColor: '#1a5f7a',
      paddingTop: 5,
    },
    totalLabel: {
      fontSize: 10,
      fontWeight: 'medium',
      marginRight: 10,
    },
    totalLabelBold: {
      fontSize: 12,
      fontWeight: 'bold',
      marginRight: 10,
      color: '#1a5f7a',
    },
    totalValue: {
      fontSize: 10,
      width: 80,
      textAlign: 'right',
    },
    totalValueBold: {
      fontSize: 12,
      fontWeight: 'bold',
      width: 80,
      textAlign: 'right',
      color: '#1a5f7a',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      borderTopWidth: 1,
      borderTopColor: '#bfbfbf',
      paddingTop: 10,
    },
    footerText: {
      fontSize: 8,
      color: '#555555',
    },
  });

  export default styles;