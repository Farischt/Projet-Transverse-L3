import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import ProductCreate from "./ProductCreate";
import { listProducts } from "../../../api/product";
import { getCategories } from "../../../api/category";

const ProductContainer = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
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

  return (
    <div className="col p-4 bg-light rounded">
      <ProductCreate
        categories={categories}
        categoriesLoading={categoriesLoading}
      />
      <hr />
    </div>
  );
};

export default ProductContainer;
