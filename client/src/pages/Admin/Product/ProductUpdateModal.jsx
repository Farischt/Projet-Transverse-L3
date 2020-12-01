import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductUpdateForm from "./ProductUpdateForm";

const ProductUpdateModal = ({ product, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1> Modifier le produit: {product.name}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductUpdateForm product={product} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}> Fermer </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductUpdateModal;
