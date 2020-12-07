import React from "react";
import ProductListDetails from "./ProductListDetails";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";

const SingleProduct = ({ product }) => {
  const { name, description, price, images, category } = product;

  return (
    <>
      <div className="col-md-7 outline-dark">
        <Carousel>
          {images &&
            images.map((image) => {
              return (
                <Carousel.Item key={image.public_id} interval={2000}>
                  <img
                    className="d-block w-100 rounded"
                    src={image.url}
                    alt="First slide"
                    style={{ objectFit: "cover", height: "80vh" }}
                  />
                  <Carousel.Caption>{product && name}</Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
      <div className="col-md-5">
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
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {product && category && category.name}
            </Card.Subtitle>
            <Card.Text>{product && description}</Card.Text>
            <ProductListDetails product={product} />
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              <ButtonGroup size="md">
                <Button
                  variant="outline-info"
                  className="m-3 rounded float-left"
                >
                  <ShoppingCartOutlined /> <br /> Panier
                </Button>
                <Button variant="outline-danger" className="m-3 rounded ">
                  <HeartOutlined /> <br /> WishList
                </Button>
                <Button
                  variant="outline-warning text-white"
                  className="m-3 rounded float-right"
                >
                  <StarOutlined /> <br /> Note
                </Button>
              </ButtonGroup>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
