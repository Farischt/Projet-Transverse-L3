import React, { useState, useEffect } from "react";
import ReactGa from "react-ga";
import { listProducts } from "../../api/product";
import Jumbotron from "./components/Jumbotron";
import ProductCard from "./components/ProductCard";
import ProductSkeleton from "./components/ProductSkeleton";
import CardColumns from "react-bootstrap/CardColumns";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    ReactGa.pageview(window.location.pathname);
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
      <div className="jumbotron text-center text-info h1 font-weight-bold">
        <Jumbotron
          text={["Nos nouvelles formations...", "Nos meilleurs ventes..."]}
        />
      </div>

      <div className="container">
        <CardColumns className=" p-2">
          {productsLoading
            ? skeleton.map((number) => {
                return <ProductSkeleton key={number} />;
              })
            : products.length
            ? products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })
            : "Aucun produits disponibles :( "}
        </CardColumns>
      </div>
    </>
  );
};

export default Home;
