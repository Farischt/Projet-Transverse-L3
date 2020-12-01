import React from "react";
import Card from "react-bootstrap/Card";
import { ShoppingCartOutlined, FundViewOutlined } from "@ant-design/icons";

const ProductCard = ({ product }) => {
  return (
    <Card key={product._id}>
      <Card.Img
        src={product.images[0].url}
        alt="Card image"
        variant="top"
        style={{ objectFit: "cover", height: "250px" }}
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
        <button className="btn btn-outline-danger m-2 my-sm-0 float-right">
          {" "}
          <ShoppingCartOutlined />{" "}
        </button>
        <button className="btn btn-outline-info m-2 my-sm-0">
          {" "}
          <FundViewOutlined />{" "}
        </button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
