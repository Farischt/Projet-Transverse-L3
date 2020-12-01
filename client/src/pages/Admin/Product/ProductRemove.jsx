import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { removeProduct } from "../../../api/product";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

const ProductRemove = ({ slug, fetchProducts }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async (slug) => {
    setLoading(true);
    try {
      const removedProduct = await removeProduct(slug);
      setLoading(false);
      toast.info(
        `Le produit ${removedProduct.data.name} a été supprimé avec succès`
      );
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400)
        toast.error(err.response.data.errorMessage);
      else
        toast.error(
          "Une erreur est survenue durant la tentative de suppression"
        );
      setLoading(false);
    }
    fetchProducts();
  };

  return (
    <button
      className="btn btn-outline-danger m-2 my-sm-0"
      onClick={() => {
        handleRemove(slug);
      }}
    >
      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <DeleteOutlined />
      )}
    </button>
  );
};

export default ProductRemove;
