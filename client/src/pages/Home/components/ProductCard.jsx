import React from "react";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  const time = Date.now();
  console.log(time);

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
      <Card.Footer>{}</Card.Footer>
    </Card>
  );
};

export default ProductCard;
