import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Spinner from "react-bootstrap/Spinner"
import { getUserCart, deleteUserCart } from "../../api/user"
import { eraseCart } from "../../redux"
import { toast } from "react-toastify"

const CheckOut = ({ eraseCart }) => {
  const [cartTotal, setCartTotal] = useState(0)
  const [cartProducts, setCartProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const emptyCart = async () => {
    try {
      setLoading(true)
      deleteUserCart()
      eraseCart()
      setCartProducts([])
      setCartTotal(0)
      setLoading(false)
      toast.info("Votre panier a été vidé")
    } catch (err) {
      setLoading(false)
      toast.error("Une erreur est survenu")
      console.log(err)
    }
  }

  useEffect(() => {
    let isSubscribed = true
    setLoading(true)
    getUserCart()
      .then((response) => {
        if (isSubscribed) {
          setCartTotal(
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(response.data.cartTotal)
          )
          setCartProducts(response.data.products)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setLoading(false)
          console.log(err.message)
        }
      })

    return () => (isSubscribed = false)
  }, [])

  return (
    <div className="container-fluid" style={{ minHeight: "80vh" }}>
      <div className="row p-2">
        <div className="col-md-6">
          <h4> Code promo </h4>
          <br />
          <input />
        </div>
        <div className="col-md-6">
          <h4> Résumé de votre commande </h4>
          <hr />

          {cartProducts.map((product, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center px-3"
              >
                {product.userQuantity} x {product.product.name}
                <strong>
                  {" "}
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}{" "}
                </strong>
              </li>
            )
          })}

          <hr />
          <li className="list-group-item d-flex justify-content-between align-items-center px-3">
            {" "}
            Prix total{" "}
            {loading ? (
              <Spinner animation="border" variant="main" />
            ) : (
              <h5 className="font-weight-bold">{cartTotal}</h5>
            )}{" "}
          </li>
          <hr />
          <div className="row">
            <div className="col-md-6 pt-2">
              <button className="btn btn-main"> Paiement </button>
            </div>
            <div className="col-md-6 pt-2">
              <button className="btn btn-main" onClick={emptyCart}>
                {" "}
                Vider le panier{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eraseCart: (cart) => dispatch(eraseCart(cart)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
