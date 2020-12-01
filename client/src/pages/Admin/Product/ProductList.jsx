import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import ProductRemove from "./ProductRemove";
import ProductUpdate from "./ProductUpdate";

const ProductList = ({ products, productsLoading, fetchProducts }) => {
  return (
    <>
      <h1> Liste des produits </h1>
      {productsLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : products.length ? (
        <CardColumns>
          {products.map((product) => {
            return (
              <Card key={product._id}>
                <Card.Img
                  src={product.images[0].url}
                  alt="Card image"
                  variant="top"
                  style={{ objectFit: "cover", height: "150px" }}
                  className="p-2 rounded"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {product.category && product.category.name}
                  </Card.Subtitle>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <ProductRemove
                    slug={product.slug}
                    fetchProducts={fetchProducts}
                  />
                  <ProductUpdate product={product} />
                </Card.Footer>
              </Card>
            );
          })}
        </CardColumns>
      ) : (
        <h3> Aucun produit disponible </h3>
      )}
    </>
  );
};

export default ProductList;
