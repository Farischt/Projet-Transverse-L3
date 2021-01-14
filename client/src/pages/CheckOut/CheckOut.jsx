import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Spinner from "react-bootstrap/Spinner"
import { getUserCart, deleteUserCart, applyCoupon } from "../../api/user"
import { eraseCart } from "../../redux"
import { toast } from "react-toastify"
import ReactGa from "react-ga"

const CheckOut = ({ history, eraseCart }) => {
  const [cartTotal, setCartTotal] = useState(0)
  const [cartProducts, setCartProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState("")

  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

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
          setTotalAfterDiscount(
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(response.data.totalAfterDiscount)
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

  const emptyCart = async () => {
    try {
      setLoading(true)
      deleteUserCart()
      eraseCart()
      setCartProducts([])
      setCartTotal(0)
      setTotalAfterDiscount(0)
      setCoupon("")
      setDiscountError("")
      setLoading(false)
      toast.info("Votre panier a été vidé")
      history.push("/cart")
    } catch (err) {
      setLoading(false)
      toast.error("Une erreur est survenu")
      console.log(err)
    }
  }

  const handleApplyCoupon = async (e) => {
    e.preventDefault()
    setCouponLoading(true)
    applyCoupon(coupon)
      .then((response) => {
        setTotalAfterDiscount(response.data)
        setCouponLoading(false)
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 404) {
          setDiscountError(err.response.data.errorMessage)
        }
        setCouponLoading(false)
      })
  }

  const handleCouponChange = (e) => {
    setCoupon(e.target.value)
    setDiscountError("")
  }

  return (
    <div className="container-fluid" style={{ minHeight: "70vh" }}>
      <div className="row p-4">
        <div className="col-md-3"> </div>
        <div
          className="col-md-6 shadow-lg p-3 bg-white"
          style={{ borderRadius: "25px" }}
        >
          <h2> Code promo </h2>
          <form className="form-group" onSubmit={handleApplyCoupon}>
            <input
              onChange={handleCouponChange}
              className="form-control"
              type="text"
              value={coupon}
              placeholder="Veuillez saisir un code promo"
              autoFocus
            />
            {discountError && (
              <>
                {" "}
                <span className="text-danger"> {discountError} </span> <br />
              </>
            )}
            <button className="btn btn-main mt-2" type="submit">
              {couponLoading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Enregistrer"
              )}
            </button>
          </form>
          <hr />
          <h2> Résumé de votre commande </h2>
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
          {totalAfterDiscount !== cartTotal && (
            <li className="list-group-item d-flex justify-content-between align-items-center px-3 bg-main text-white">
              {" "}
              Prix après remise
              {loading ? (
                <Spinner animation="border" variant="main" />
              ) : (
                <h5 className="font-weight-bold text-white">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalAfterDiscount)}
                </h5>
              )}{" "}
            </li>
          )}
          <hr />

          <div className="btn-group-item d-flex justify-content-between align-items-center px-3">
            <button
              className="btn btn-main"
              onClick={() => history.push("/payment")}
            >
              {" "}
              Paiement{" "}
            </button>
            <button className="btn btn-danger" onClick={emptyCart}>
              {" "}
              Vider le panier{" "}
            </button>
          </div>
        </div>
        <div className="col-md-3"> </div>
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
