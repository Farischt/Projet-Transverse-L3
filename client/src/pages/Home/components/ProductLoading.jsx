import React from "react";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import Spinner from "react-bootstrap/Spinner";

const ProductLoading = ({ count }) => {
  const productLoadingCard = () => {
    let totalProductCards = [];
    for (let i = 0; i < count; i++) {
      totalProductCards.push(
        <Card key={i}>
          <Card.Img
            src="holder.js/250x200"
            alt="Card image"
            variant="top"
            style={{ objectFit: "cover", height: "250px" }}
            className="p-2 rounded"
          />
          <Card.Body>
            <Card.Title>
              <div className="text-center">
                <Spinner animation="grow" />
              </div>
              <Skeleton />
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <Skeleton />
            </Card.Subtitle>
            <Card.Text>
              <Skeleton />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <button className="btn btn-outline-danger m-2 my-sm-0 float-right">
              <Spinner animation="border" variant="danger" />
            </button>
            <button className="btn btn-outline-info m-2 my-sm-0">
              <Spinner animation="border" variant="info" />
            </button>
          </Card.Footer>
        </Card>
      );
    }
    return totalProductCards;
  };

  return productLoadingCard();
};

export default ProductLoading;
