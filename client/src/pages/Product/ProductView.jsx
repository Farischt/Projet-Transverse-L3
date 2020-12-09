import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import SingleProduct from "./SingleProduct";
import { readProduct } from "../../api/product";

const ProductView = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await readProduct(slug);
        setLoading(false);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="text-center" style={{ marginTop: "40vh" }}>
          <Spinner animation="border" variant="info" role="status" as="span" />
          <br />
          <span className="text-info"> Chargement ... </span>
        </div>
      ) : (
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductView;
