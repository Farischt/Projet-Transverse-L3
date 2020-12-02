import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import ProductCreate from "./ProductCreate";
import ProductList from "./ProductList";
import { listProducts } from "../../../api/product";
import { getCategories } from "../../../api/category";

const ProductContainer = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await getCategories();
      setCategories(response.data);
      setCategoriesLoading(false);
    } catch (err) {
      setCategoriesLoading(false);
      if (err.response.status === 400) {
        setCategories([]);
      } else
        toast.error(
          "Une erreur est survenue durant le chargement des catégories"
        );
    }
  };

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
    <div className="col p-4 bg-light rounded" style={{ minHeight: "90vh" }}>
      <ProductCreate
        categories={categories}
        categoriesLoading={categoriesLoading}
        fetchProducts={fetchProducts}
      />
      <hr />
      <ProductList
        products={products}
        productsLoading={productsLoading}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default ProductContainer;
