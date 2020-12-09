import React, { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "../../../api/product";
import Spinner from "react-bootstrap/Spinner";
import FileUpload from "./FileUpload";

const ProductCreate = ({ categories, categoriesLoading, fetchProducts }) => {
  const initialState = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    images: [],
  };

  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { name, description, price, quantity, category } = product;

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async () => {
    setLoading(true);
    try {
      const newProduct = await createProduct(product);
      setLoading(false);
      toast.info(
        `Le produit "${newProduct.data.name}" a été crée avec succès !`
      );
      setProduct(initialState);
      fetchProducts();
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400)
        toast.error(err.response.data.errorMessage);
      else {
        toast.error("Une erreur est survenue");
      }
    }
  };

  return (
    <>
      {categoriesLoading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : (
        <>
          {" "}
          <h1> Créer une produit </h1>
          <div className="form">
            <input
              onChange={(e) => handleChange(e)}
              className="form-control my-2"
              type="text"
              value={name}
              name="name"
              placeholder="Nom du produit"
              autoFocus
              required
            />

            <input
              onChange={handleChange}
              className="form-control my-2"
              type="textarea"
              value={description}
              name="description"
              placeholder="Description du produit"
              required
            />

            <input
              onChange={handleChange}
              className="form-control my-2"
              type="number"
              value={price}
              name="price"
              placeholder="Prix du produit"
              required
            />

            <input
              onChange={handleChange}
              className="form-control my-2"
              type="number"
              value={quantity}
              name="quantity"
              placeholder="Quantité du produit"
              required
            />

            <select
              onChange={handleChange}
              name="category"
              className="form-control my-2"
              value={category}
            >
              <option>Choisir une catégorie </option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {" "}
                      {category.name}{" "}
                    </option>
                  );
                })}
            </select>
            <FileUpload product={product} setProduct={setProduct} />

            <button
              className="btn btn-primary my-2 my-sm-0"
              onClick={handleCreateProduct}
            >
              {loading ? (
                <Spinner animation="border" variant="info" />
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductCreate;
