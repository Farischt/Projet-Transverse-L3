import React, { useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { addProductToCart } from "../../../redux"
import { userCart } from "../../../api/user"

const CartSummary = ({ userData, cartData }) => {
  let history = useHistory()

  const [loading, setLoading] = useState(false)

  const cartTotal = () => {
    let total = 0
    if (cartData && cartData.length > 0) {
      cartData.forEach((product) => {
        total += product.price * product.userQuantity
      })
    }
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(total)
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await userCart(cartData)
      setLoading(false)
      if (response.data.ok) {
        history.push("/checkout")
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const checkOutButton = () => {
    return userData && userData.isLoggedIn ? (
      <button
        type="button"
        className="btn btn-main btn-block"
        disabled={!cartData.length}
        onClick={handleCheckout}
      >
        Accéder au paiement
      </button>
    ) : (
      <button type="button" className="btn btn-main btn-block">
        Se connecter
      </button>
    )
  }

  return (
    <div
      className="mb-3 mt-3 shadow-lg p-3 bg-white"
      style={{ borderRadius: "25px" }}
    >
      <div>
        <h4 className="text-center"> Total </h4>
        <ul className="list-group list-group-flush p-3 rounded">
          {cartData &&
            cartData.length > 0 &&
            cartData.map((product) => {
              return (
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 p-2"
                >
                  {product.name} : {product.userQuantity} x {product.price}
                  ,00€
                  <span>{product.price * product.userQuantity},00 €</span>
                </li>
              )
            })}
          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 p-2">
            <strong> Prix temporaire </strong>
            <strong>{cartTotal()} </strong>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0 p-2">
            <strong> Livraison </strong>
            <strong>Pas d'option</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3 p-2">
            <div>
              <strong>Prix final </strong>
              <strong>
                <p className="mb-0">(Toutes taxes comprises)</p>
              </strong>
            </div>
            <span>
              <strong>{cartTotal()}</strong>
            </span>
          </li>
        </ul>
        {checkOutButton()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
    userData: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(addProductToCart(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)
