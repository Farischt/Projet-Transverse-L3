import React from "react"
import ProductListDetails from "./ProductListDetails"
import ProductButtons from "./ProductButtons"
import Card from "react-bootstrap/Card"
import Carousel from "react-bootstrap/Carousel"
import Badge from "react-bootstrap/Badge"
import StarRatings from "react-star-ratings"

const SingleProduct = ({ product }) => {
  const { _id, name, description, price, images, category, ratings } = product

  const averageRate = () => {
    if (product && ratings && ratings.length > 0) {
      let sum = 0
      for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].star
      }
      return sum / ratings.length
    }
  }

  return (
    <>
      <div className="col-md-7 p-2 outline-dark">
        <Carousel>
          {images &&
            images.map((image) => {
              return (
                <Carousel.Item key={image.public_id} interval={2000}>
                  <img
                    className="d-block w-100 rounded"
                    src={image.url}
                    alt="First slide"
                    style={{ objectFit: "cover", height: "90vh" }}
                  />
                  <Carousel.Caption>{product && name}</Carousel.Caption>
                </Carousel.Item>
              )
            })}
        </Carousel>
      </div>
      <div className="col-md-5 p-2">
        <Card className="border-dark">
          <Card.Body>
            <Card.Title>
              {product && name} -{" "}
              {product &&
                product.price &&
                new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(price)}
              <Badge variant="danger" className="mx-3">
                New
              </Badge>
              {product && product.quantity === 0 && (
                <Badge variant="danger" className="mx-3">
                  Rupture de stock
                </Badge>
              )}
              <br />
              <StarRatings
                name={_id}
                rating={
                  (product && ratings && ratings.length > 0 && averageRate()) ||
                  0
                }
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="25px"
                starSpacing="10px"
              />
              <Badge className="mx-1">
                ({product && ratings && ratings.length})
              </Badge>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {product && category && category.name}
            </Card.Subtitle>
            <Card.Text>{product && description}</Card.Text>
            <ProductListDetails product={product} />
          </Card.Body>
          <Card.Footer>
            <ProductButtons product={product} />
          </Card.Footer>
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
