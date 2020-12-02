import React, { useEffect, useState } from "react";

import SingleProduct from "./SingleProduct";

import { readProduct } from "../../api/product";

const ProductView = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    getProduct();
  }, [slug]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await readProduct(slug);
      setLoading(false);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row"></div>
    </div>
  );
};

export default ProductView;
