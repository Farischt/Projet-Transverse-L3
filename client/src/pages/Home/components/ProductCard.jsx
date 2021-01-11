import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { addProductToCart, setDrawerVisible } from "../../../redux"
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import StarRatings from "react-star-ratings"
import { Tooltip } from "antd"
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons"

const ProductCard = ({
  product,
  addProductToCart,
  cartData,
  setDrawerVisible,
}) => {
  const [average, setAverage] = useState(0)
  const [isNew, setisNew] = useState(false)
  const [toolTip, setToolTip] = useState("Ajouter au panier")

  // Setting average rating
  useEffect(() => {
    if (product && product.ratings && product.ratings.length > 0) {
      let sum = 0
      for (let i = 0; i < product.ratings.length; i++) {
        sum += product.ratings[i].star
      }
      setAverage(sum / product.ratings.length)
    }
  }, [product, product.ratings])

  // Check if the product is new or not
  useEffect(() => {
    if (product && product.createdAt) {
      const today = new Date(Date.now())
      const createdAt = new Date(product.createdAt)
      const timeElapsed = today.getMonth() - createdAt.getMonth()
      if (timeElapsed === 0) {
        setisNew(true)
      }
    }
  }, [product])

  // Check if the product is already in cart or not
  useEffect(() => {
    const checkInCart = cartData.find((element) => element._id === product._id)
    if (checkInCart) {
      setToolTip("Déjà dans votre panier")
    }
  }, [cartData, product._id])

  const handleAddToCart = () => {
    addProductToCart(product)
    setDrawerVisible()
  }

  return (
    <Card key={product._id}>
      {product && product.images && (
        <Card.Img
          src={product.images && product.images[0].url}
          alt="Card image"
          variant="top"
          style={{ objectFit: "cover", height: "250px" }}
          className="p-2"
        />
      )}
      <Card.Body>
        <Card.Title>
          {product.name} -
          <Badge variant="main" className="mx-1">
            {" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}{" "}
          </Badge>
          {product.quantity === 0 && (
            <>
              {" "}
              - <Badge variant="danger"> Rupture </Badge>{" "}
            </>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.category && product.category.name}
          {isNew && (
            <Badge variant="danger" className="mx-1">
              New
            </Badge>
          )}
        </Card.Subtitle>
        <Card.Text className="text-muted">
          {product.description.slice(0, 30) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <StarRatings
          name={product._id}
          rating={average}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="25px"
          starSpacing="5px"
        />{" "}
        <Link to={`/product/${product.slug}`}>
          <button className="btn btn-outline-info m-2 my-sm-0 ">
            <EyeOutlined />
          </button>
        </Link>
        <Tooltip placement="top" title={toolTip}>
          <button
            className="btn btn-outline-danger m-2 my-sm-0 float-right"
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
          >
            {" "}
            <ShoppingCartOutlined />{" "}
          </button>{" "}
        </Tooltip>
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
    setDrawerVisible: () => dispatch(setDrawerVisible()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
