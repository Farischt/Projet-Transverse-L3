import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CategoryUpdateForm from "./CategoryUpdateForm";

const CategoryUpdateModal = ({ slug, reload, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1> Modifier une catégorie </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryUpdateForm slug={slug} reload={reload} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}> Fermer </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryUpdateModal;
