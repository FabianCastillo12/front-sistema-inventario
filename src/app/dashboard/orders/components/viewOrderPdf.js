import React from 'react';
import { Document, Page, Text, View, Font, Image } from '@react-pdf/renderer';
import styles from './facturaStyles';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

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
            <Text style={styles.companyName}>LA FABRICA S.A.C.</Text>
            <Text style={styles.companyDetails}>RUC: 20123456789</Text>
            <Text style={styles.companyDetails}>Av. Principal 123, Ica, Perú</Text>
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>Gracias por su compra</Text>
          <Text style={styles.footerText}>Para cualquier consulta, contáctenos al +51 123 456 789</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ViewOrderPdf;