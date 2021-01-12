import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { addProductToCart } from "../../../redux"
import CardColumns from "react-bootstrap/CardColumns"
import ProductCard from "./ProductCard"
import emptyCart from "../../../img/emptyCart.png"

const CartItems = ({ cartData }) => {
  let history = useHistory()

  return (
    <>
      {" "}
      <h4>
        {" "}
        Votre panier <strong>{`(${cartData && cartData.length})`}</strong>{" "}
      </h4>
      {cartData && cartData.length > 0 && (
        <CardColumns>
          {cartData.map((product) => {
            return <ProductCard key={product._id} product={product} />
          })}
        </CardColumns>
      )}
      {cartData && !cartData.length && (
        <div className="text-center">
          <div className="text-center p-4">
            <img
              src={emptyCart}
              className="img-fluid"
              style={{ height: "45vh", objectFit: "cover" }}
              alt=""
            />
          </div>
          <p>
            {" "}
            Aucun produit dans votre panier
            <button
              className="btn btn-main m-2 my-sm-0"
              onClick={() => history.push("/shop")}
            >
              Allez vers la boutique
            </button>
          </p>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(addProductToCart(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
