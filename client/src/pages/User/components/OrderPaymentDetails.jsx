import React from "react"

const OrderPaymentDetails = ({ order }) => {
  return (
    <div className="p-2">
      <h3> Details de paiement </h3>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        {" "}
        <strong>Prix : </strong>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(order.paymentIntent.amount / 100)}{" "}
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        {" "}
        <strong>Monnaie : </strong> {order.paymentIntent.currency.toUpperCase()}
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        {" "}
        <strong>Moyen de paiement : </strong>
        {order.paymentIntent.payment_method_types[0].toUpperCase()}
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        {" "}
        <strong>Le : </strong>
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </li>
    </div>
  )
}

export default OrderPaymentDetails
