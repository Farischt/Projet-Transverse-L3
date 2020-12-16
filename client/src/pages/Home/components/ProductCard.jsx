import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import StarRatings from "react-star-ratings"
import { Link } from "react-router-dom"
import _ from "lodash"
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons"

const ProductCard = ({ product }) => {
  const [average, setAverage] = useState(0)
  const [newP, setNewP] = useState(false)

  useEffect(() => {
    if (product && product.ratings && product.ratings.length > 0) {
      let sum = 0
      for (let i = 0; i < product.ratings.length; i++) {
        sum += product.ratings[i].star
      }
      setAverage(sum / product.ratings.length)
    }
  }, [product, product.ratings])

  useEffect(() => {
    if (product && product.createdAt) {
      const today = new Date(Date.now())
      const createdAt = new Date(product.createdAt)
      const timeElapsed = today.getMonth() - createdAt.getMonth()
      if (timeElapsed === 0) {
        setNewP(true)
      }
    }
  }, [product])

  const handleAddToCart = () => {
    let cart = []
    if (window) {
      // if cart is available in local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      cart.push({
        ...product,
        quantity: 1,
      })
      let unique = _.uniqWith(cart, _.isEqual)
      console.log(unique)

      localStorage.setItem("cart", JSON.stringify(unique))
    }
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
          {product.name}{" "}
          {newP && (
            <Badge variant="danger" className="mx-1">
              New
            </Badge>
          )}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.category && product.category.name}
        </Card.Subtitle>
        <Card.Text className="text-muted">
          {product.description.slice(0, 30) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <button
          className="btn btn-outline-danger m-2 my-sm-0 float-right"
          onClick={handleAddToCart}
        >
          {" "}
          <ShoppingCartOutlined />{" "}
        </button>{" "}
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
      </Card.Footer>
    </Card>
  )
}

export default ProductCard
