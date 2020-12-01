import React from "react";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import Spinner from "react-bootstrap/Spinner";

const ProductSkeleton = () => {
  return (
    <Card>
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
};

export default ProductSkeleton;
