import React from "react"
import { connect } from "react-redux"
import {
  addProductToCart,
  updateQuantity,
  removeProductFromCart,
} from "../../../redux"
import { useHistory } from "react-router-dom"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"

const ProductCard = ({ product, updateQuantity, removeProductFromCart }) => {
  let history = useHistory()

  const formatPrice = () => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(product.price)
  }

  const formatProductTotal = () => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(product.price * product.userQuantity)
  }

  const handleChange = (e) => {
    let value =
      e.target.value <= product.quantity ? e.target.value : product.quantity
    updateQuantity(product, parseInt(value))
  }

  const handleRemove = () => {
    removeProductFromCart(product)
  }

  return (
    <Card key={product._id}>
      <Card.Img
        variant="top"
        src={product.images[0].url}
        style={{ height: "150px", objectFit: " cover" }}
      />
      <ListGroup className="list-group-flush">
        <ListGroupItem bsPrefix="list-group-item d-flex justify-content-between align-items-center px-3">
          <strong>Nom </strong>
          {product.name}
        </ListGroupItem>
        <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center px-3">
          <strong>Prix </strong>
          {formatPrice()}
        </ListGroupItem>
        <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center px-3">
          <strong> Quantité </strong>
          <input
            type="number"
            className="form-control ml-4"
            value={product.userQuantity}
            defaultValue={1}
            onChange={handleChange}
            min={1}
            max={product.quantity}
          />
        </ListGroupItem>
        <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center px-3">
          <strong>Total </strong>
          {formatProductTotal()}
        </ListGroupItem>
      </ListGroup>
      <Card.Footer bg="dark">
        <button className="btn btn-danger btn-block" onClick={handleRemove}>
          Supprimer
        </button>
        <button
          className="btn btn-main btn-block"
          onClick={() => history.push(`product/${product.slug}`)}
        >
          Details
        </button>
      </Card.Footer>
    </Card>
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
    updateQuantity: (product, quantity) =>
      dispatch(updateQuantity(product, quantity)),
    removeProductFromCart: (product) =>
      dispatch(removeProductFromCart(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
