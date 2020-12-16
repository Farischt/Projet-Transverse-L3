import React from "react"
import Card from "react-bootstrap/Card"
import Skeleton from "react-loading-skeleton"
import Spinner from "react-bootstrap/Spinner"
import StarRatings from "react-star-ratings"

const ProductLoading = ({ count }) => {
  const productLoadingCard = () => {
    let totalProductCards = []
    for (let i = 0; i < count; i++) {
      totalProductCards.push(
        <Card key={i}>
          <Card.Body style={{ minHeight: "62vh" }}>
            <Card.Title>
              <div className="text-center">
                <Spinner animation="grow" />
              </div>
              <Skeleton style={{ marginTop: "10vh" }} />
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <Skeleton />
            </Card.Subtitle>
            <Card.Text>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div>
              <button className="btn btn-outline-danger m-2 my-sm-0 float-right">
                <Spinner animation="border" variant="danger" />
              </button>
            </div>
            <StarRatings
              rating={0}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="25px"
              starSpacing="5px"
            />{" "}
            <div>
              <button className="btn btn-outline-info m-2 my-sm-0">
                <Spinner animation="border" variant="info" />
              </button>
            </div>
          </Card.Footer>
        </Card>
      )
    }
    return totalProductCards
  }

  return productLoadingCard()
}

export default ProductLoading
