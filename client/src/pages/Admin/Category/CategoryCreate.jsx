import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../../../api/category";
import Spinner from "react-bootstrap/Spinner";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createCategory({ name });
      setLoading(false);
      toast.info(`La catégorie ${name} a été ajouté avec succès`);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400)
        toast.error(err.response.data.errorMessage);
      else toast.error("Une erreur est survenu");
    }
  };

  return (
    <>
      {" "}
      <h1> Créer une catégorie </h1>
      <div className="form">
        <label> Nom </label>
        <input
          onChange={handleChange}
          className="form-control my-2"
          type="text"
          value={name}
          placeholder="Nom de la catégorie"
          autoFocus
          required
        />
        <button onClick={handleCreate} className="btn btn-primary my-2 my-sm-0">
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>
    </>
  );
};

export default CategoryCreate;
