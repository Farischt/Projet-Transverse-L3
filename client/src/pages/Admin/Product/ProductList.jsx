import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const ProductList = ({ products, productsLoading }) => {
  return (
    <>
      <h1> Liste des produits </h1>
      {productsLoading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : (
        <CardColumns>
          {products.map((product) => {
            return (
              <Card key={product._id} border="dark">
                <img
                  className="m-2 rounded"
                  style={{ height: "150px", objectFit: "cover" }}
                  src={product.images[0].url}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {product.category.name}
                  </Card.Subtitle>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn btn-primary my-2 my-sm-0 ">
                    {" "}
                    Update{" "}
                  </button>
                  <button className="btn btn-danger m-2 my-sm-0 ">
                    {" "}
                    Delete{" "}
                  </button>
                </Card.Footer>
              </Card>
            );
          })}{" "}
        </CardColumns>
      )}
    </>
  );
};

export default ProductList;
