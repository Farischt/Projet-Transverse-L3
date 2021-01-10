import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripeCheckout from "./components/StripeCheckout"
import "../../css/Stripe.css"
import { getUserCart } from "../../api/user"
import Spinner from "react-bootstrap/Spinner"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    setLoading(true)
    getUserCart().then((res) => {
      if (isSubscribed) {
        setTotalPrice(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(res.data.cartTotal)
        )
        setTotalAfterDiscount(
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(res.data.totalAfterDiscount)
        )
        setLoading(false)
      }
    })

    return () => (isSubscribed = false)
  }, [])

  return (
    <div className="container p-5 text-center" style={{ minHeight: "80vh" }}>
      <h1>
        {" "}
        Paiement : <br />
        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : totalAfterDiscount < totalPrice ? (
          <> {totalAfterDiscount} </>
        ) : (
          <> {totalPrice} </>
        )}{" "}
      </h1>
      <Elements stripe={stripePromise}>
        <div className="col-md-6 offset-md-3">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  )
}

export default Payment
