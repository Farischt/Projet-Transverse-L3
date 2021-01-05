import React, { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { createPaymentIntent } from "../../../api/stripe"
import { Link } from "react-router-dom"

const cartStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    let isSubscribed = true
    createPaymentIntent()
      .then((response) => {
        if (isSubscribed) {
          console.log("payment intent created", response.data)
          setClientSecret(response.data.clientSecret)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    return () => (isSubscribed = false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billingDetails: {
          name: e.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Le paiement n'a pas aboutit : ${payload.error}`)
      setProcessing(false)
    } else {
      // create order and save database
      console.log(JSON.stringify(payload, null, 4))
      setError("")
      setProcessing(false)
      setSucceeded(true)
    }
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  return (
    <>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Paiement réussi. <Link to="/user/dashboard"> Voir votre commande </Link>
      </p>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          option={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button bg-main"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner">
                {" "}
              </div>
            ) : (
              "Payer"
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {" "}
            {error}{" "}
          </div>
        )}
      </form>
    </>
  )
}

export default StripeCheckout
