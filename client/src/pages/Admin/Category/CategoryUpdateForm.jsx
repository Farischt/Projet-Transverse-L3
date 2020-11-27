import React, { useState } from "react";
import { updateCategory } from "../../../api/category";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

const CategoryUpdateForm = (props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateCategory(props.slug, { name });
      setLoading(false);
      toast.info(`La catégorie ${props.slug} a été modifié en ${name}`);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400)
        toast.error(err.response.data.errorMessage);
      else toast.error("Une erreur est survenu");
    }
    props.reload();
  };

  return (
    <div className="form">
      <label> Nom </label>
      <input
        onChange={handleChange}
        className="form-control my-2"
        type="text"
        value={name}
        autoFocus
        required
      />
      <button onClick={handleUpdate} className="btn btn-primary my-2 my-sm-0">
        {loading ? (
          <Spinner animation="border" variant="info" />
        ) : (
          "Enregistrer"
        )}
      </button>
    </div>
  );
};

export default CategoryUpdateForm;
