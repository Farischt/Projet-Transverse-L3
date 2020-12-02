import React, { useState, useEffect } from "react";
import { listPagination, productsTotal } from "../../../api/product";
import ProductCard from "./ProductCard";
import ProductLoading from "./ProductLoading";
import CardColumns from "react-bootstrap/CardColumns";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [countProducts, setCountProducts] = useState(1);
  const sort = "sold";
  const order = "desc";
  const perPage = 3;

  useEffect(() => {
    productsTotal().then((res) => setCountProducts(res.data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await listPagination(sort, order, page);
      setProducts(response.data);
      setProductsLoading(false);
    } catch (err) {
      setProductsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h4 className="text-center text-danger font-weight-bold">
        Nos meilleurs ventes
      </h4>
      <CardColumns className="p-2">
        {productsLoading ? (
          <ProductLoading count={perPage} />
        ) : products.length ? (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        ) : (
          <div className="text-center">
            <h5 className="font-weight-bold"> Aucun produit disponible </h5>
          </div>
        )}
      </CardColumns>
      <div className="text-center">
        {" "}
        <Pagination
          current={page}
          total={(countProducts / perPage) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default BestSellers;
