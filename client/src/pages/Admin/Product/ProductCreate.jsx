import React, { useState } from "react";
import { toast } from "react-toastify";
// import { createCategory } from "../../../api/category";
import Spinner from "react-bootstrap/Spinner";

const ProductCreate = () => {
  const initialState = {
    name: "",
    description: "",
    price: null,
    quantity: null,
    category: null,
    images: [],
  };

  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { name, description, price, quantity, category, images } = product;

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      {" "}
      <h1> Créer une produit </h1>
      <div className="form">
        <input
          onChange={handleChange}
          className="form-control my-2"
          type="text"
          value={name}
          placeholder="Nom du produit"
          autoFocus
          required
        />

        <input
          onChange={handleChange}
          className="form-control my-2"
          type="textarea"
          value={description}
          placeholder="Description du produit"
          autoFocus
          required
        />

        <input
          onChange={handleChange}
          className="form-control my-2"
          type="number"
          value={price}
          placeholder="Prix du produit"
          autoFocus
          required
        />

        <input
          onChange={handleChange}
          className="form-control my-2"
          type="number"
          value={quantity}
          placeholder="Quantité du produit"
          autoFocus
          required
        />

        <input
          onChange={handleChange}
          className="form-control my-2"
          type="text"
          value={images}
          placeholder="Lien vers l'image"
          autoFocus
          required
        />
        <button className="btn btn-primary my-2 my-sm-0">
          {loading ? (
            <Spinner animation="border" variant="info" />
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>
    </>
  );
};

export default ProductCreate;
