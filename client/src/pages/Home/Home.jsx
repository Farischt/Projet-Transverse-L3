import React, { useState, useEffect } from "react";
import { listProducts } from "../../api/product";
import ProductCard from "./components/ProductCard";
import CardColumns from "react-bootstrap/CardColumns";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await listProducts();
      setProducts(response.data);
      setProductsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="jumbotron">
        {productsLoading ? <h4> Loading... </h4> : <h4> All products </h4>}
      </div>

      <div className="container">
        <CardColumns className="bg-dark">
          {products.length &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </CardColumns>
      </div>
    </>
  );
};

export default Home;
