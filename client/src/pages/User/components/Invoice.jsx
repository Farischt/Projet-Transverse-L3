import React from "react"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
})

const Invoice = ({ order }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.body}>
            <View>
              <Text style={styles.header} fixed>
                {" "}
                {new Date().toLocaleString()}{" "}
              </Text>
              <Text style={styles.title}>Reçu de votre commande</Text>
              <Text style={styles.author}>Formations & Logiciels</Text>
              <Text style={styles.subtitle}>
                {" "}
                Résumé de votre commande du :{" "}
                {new Date(
                  order.paymentIntent.created * 1000
                ).toLocaleString()}{" "}
              </Text>
              {order.products.map((element) => {
                return (
                  <Text key={element.product._id} style={styles.text}>
                    {element.userQuantity} x {element.product.name} :{" "}
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(element.userQuantity * element.product.price)}
                  </Text>
                )
              })}
              <Text style={styles.subtitle}> Informations de paiement : </Text>
              <Text style={styles.text}>
                {" "}
                Prix total payé :{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(order.paymentIntent.amount / 100)}{" "}
              </Text>
              <Text style={styles.text}>
                {" "}
                Monnaie : {order.paymentIntent.currency.toUpperCase()}{" "}
              </Text>
              <Text style={styles.text}>
                Moyen de paiement :{" "}
                {order.paymentIntent.payment_method_types[0].toUpperCase()}
              </Text>
              <Text style={styles.footer}>{order._id}</Text>
            </View>
          </Page>
        </Document>
      }
      fileName={`${order._id}.pdf`}
      className="btn btn-primary"
    >
      {" "}
      Télécharger PDF
    </PDFDownloadLink>
  )
}

export default Invoice
