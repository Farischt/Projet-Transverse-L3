import React, { useEffect } from "react"
import CartItems from "./components/CartItems"
import CartSummary from "./components/CartSummary"
import ReactGa from "react-ga"

const CartView = () => {
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])
  return (
    <div className="container-fluid" style={{ minHeight: "80vh" }}>
      <div className="row">
        <div className="col-md-8 p-3 pb-0 ">
          <CartItems />
        </div>

        <div className="col-md-4">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default CartView
