import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripeCheckout from "./components/StripeCheckout"
import "../../css/Stripe.css"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

const Payment = () => {
  return (
    <div className="container p-5 text-center" style={{ minHeight: "80vh" }}>
      <h1> Paiement </h1>
      <Elements stripe={stripePromise}>
        <div className="col-md-6 offset-md-3">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  )
}

export default Payment
