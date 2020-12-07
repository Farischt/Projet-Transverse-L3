import React from "react";

const ProductListDetails = ({ product }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Prix
        <span className=" float-sm-right">
          {product &&
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}
        </span>
      </li>
      <li className="list-group-item">
        Catégorie
        <span className=" float-sm-right">
          {product && product.category && product.category.name}
        </span>
      </li>
      <li className="list-group-item">
        Quantité
        <span className=" float-sm-right">{product && product.quantity}</span>
      </li>
      <li className="list-group-item">
        Vendu
        <span className=" float-sm-right">{product && product.sold}</span>
      </li>
    </ul>
  );
};

export default ProductListDetails;
