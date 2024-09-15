import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Registrar fuentes personalizadas
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

// Función para formatear la moneda
const currencyFormatter = (value) => {
  return 'S/ ' + Number(value).toFixed(2);
};

const ViewOrderPdf = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/api/placeholder/150/50" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.companyName}>Tu Empresa S.A.</Text>
            <Text style={styles.companyDetails}>RUC: 20123456789</Text>
            <Text style={styles.companyDetails}>Av. Principal 123, Lima, Perú</Text>
          </View>
        </View>

        {/* Información de la factura */}
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceTitle}>FACTURA ELECTRÓNICA</Text>
          <Text style={styles.invoiceNumber}>N° {formData.id}</Text>
          <Text style={styles.invoiceDate}>Fecha: {formData.fecha}</Text>
        </View>

        {/* Información del Cliente */}
        <View style={styles.clientInfo}>
          <Text style={styles.sectionTitle}>DATOS DEL CLIENTE</Text>
          <Text style={styles.clientDetail}>Cliente: {formData.cliente}</Text>
          <Text style={styles.clientDetail}>Email: {formData.email}</Text>
          <Text style={styles.clientDetail}>Teléfono: {formData.telefono}</Text>
          <Text style={styles.clientDetail}>Dirección: {formData.direccion}</Text>
        </View>

        {/* Tabla de Productos */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableColSmall}><Text style={styles.tableCellHeader}>ID</Text></View>
            <View style={styles.tableColLarge}><Text style={styles.tableCellHeader}>Producto</Text></View>
            <View style={styles.tableColMedium}><Text style={styles.tableCellHeader}>Cant.</Text></View>
            <View style={styles.tableColMedium}><Text style={styles.tableCellHeader}>P. Unit.</Text></View>
            <View style={styles.tableColMedium}><Text style={styles.tableCellHeader}>IGV</Text></View>
            <View style={styles.tableColMedium}><Text style={styles.tableCellHeader}>Subtotal</Text></View>
          </View>

          {formData.detallePedidos.map((detalle, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableColSmall}><Text style={styles.tableCell}>{index + 1}</Text></View>
              <View style={styles.tableColLarge}><Text style={styles.tableCell}>{detalle.producto.nombre}</Text></View>
              <View style={styles.tableColMedium}><Text style={styles.tableCell}>{detalle.cantidad}</Text></View>
              <View style={styles.tableColMedium}><Text style={styles.tableCell}>{currencyFormatter(detalle.producto.precio)}</Text></View>
              <View style={styles.tableColMedium}><Text style={styles.tableCell}>{currencyFormatter(detalle.producto.precio * 0.18 * detalle.cantidad)}</Text></View>
              <View style={styles.tableColMedium}><Text style={styles.tableCell}>{currencyFormatter(detalle.subTotal)}</Text></View>
            </View>
          ))}
        </View>

        {/* Totales */}
        <View style={styles.totals}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalLabel}>Base imponible:</Text>
            <Text style={styles.totalValue}>{currencyFormatter(formData.total - formData.total * 0.18)}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalLabel}>IGV (18%):</Text>
            <Text style={styles.totalValue}>{currencyFormatter(formData.total * 0.18)}</Text>
          </View>
          <View style={styles.totalsRowBold}>
            <Text style={styles.totalLabelBold}>TOTAL:</Text>
            <Text style={styles.totalValueBold}>{currencyFormatter(formData.total)}</Text>
          </View>
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Gracias por su compra</Text>
          <Text style={styles.footerText}>Para cualquier consulta, contáctenos al +51 123 456 789</Text>
        </View>
      </Page>
    </Document>
  );
};

// Estilos mejorados
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

export default ViewOrderPdf;