import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getCategories,
  getCategory,
  removeCategory,
  updateCategory,
  createCategory,
} from "../../../api/category";
import AdminNav from "../../../components/Nav/AdminNav";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryForm = () => {
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
        <button onClick={handleClick} className="btn btn-info my-2 my-sm-0">
          {" "}
          Enregister{" "}
        </button>
      </div>
    );
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.succes(`La catégorie ${res.data.name} a été ajouté`);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400)
          toast.error(error.response.data.errorMessage);
        else toast.error("Une erreur est survenu");
      });
  };

  return (
    <div className="col p-4">
      <h1> Créer une catégorie </h1>
      {categoryForm()}
    </div>
  );
};

export default CategoryCreate;
