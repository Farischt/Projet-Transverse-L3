import React, { useState } from "react"
// import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner"

const ProductUpdateForm = ({ product }) => {
  const initialState = {
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    category: product.category.name,
    images: product.images,
  }

  const [newProduct, setNewProduct] = useState(initialState)
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)

  const { name, description, price, quantity } = newProduct

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  return (
    <>
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
        <button className="btn btn-outline-info my-2 my-sm-0">
          {loading ? (
            <Spinner animation="border" variant="info" />
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>
    </>
  )
}

export default ProductUpdateForm
