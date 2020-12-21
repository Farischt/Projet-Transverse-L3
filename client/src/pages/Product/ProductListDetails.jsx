import React from "react"

const ProductListDetails = ({ product }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        Prix
        <strong>
          {product &&
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}
        </strong>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        Catégorie
        <strong>{product && product.category && product.category.name}</strong>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        Quantité
        <strong>{product && product.quantity}</strong>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-3">
        Vendu
        <strong>{product && product.sold}</strong>
      </li>
    </ul>
  )
}

export default ProductListDetails
