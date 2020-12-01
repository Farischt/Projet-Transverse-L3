import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { removeCategory } from "../../../api/category";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

const CategoryRemove = ({ slug, reload }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (
      window.confirm(
        "Attention, vous êtes sur le point de supprimer une catégorie ! Voulez-vous continuer ?"
      )
    ) {
      setLoading(true);
      try {
        const removedCategory = await removeCategory(slug);
        setLoading(false);
        toast.info(
          `La catégorie ${removedCategory.data.name} a été supprimé avec succès`
        );
      } catch (err) {
        setLoading(false);
        if (err.response.status === 400)
          toast.error(err.response.data.errorMessage);
        else
          toast.error(
            "Une erreur est survenue durant la tentative de suppression"
          );
      }
      await reload();
    }
  };

  return (
    <button
      className="btn btn-danger m-2 my-sm-0 float-right"
      onClick={handleRemove}
    >
      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <DeleteOutlined />
      )}
    </button>
  );
};

export default CategoryRemove;
