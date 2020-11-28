import React, { useState, useEffect } from "react";
import { getCategories } from "../../../api/category";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import CategoryRemove from "./CategoryRemove";
import CategoryUpdate from "./CategoryUpdate";
import CategorySearch from "./CategorySearch";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [query, setQuery] = useState("");

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
        // toast.error(err.response.data.errorMessage);
      } else
        toast.error(
          "Une erreur est survenue durant le chargement des catégories"
        );
    }
  };

  const searched = (query) => (category) =>
    category.name.toLowerCase().includes(query);

  return (
    <>
      {categoriesLoading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : categories.length ? (
        <>
          <ul className="list-group rounded">
            <h1> Liste des catégories </h1>
            <CategorySearch query={query} setQuery={setQuery} />
            {categories.filter(searched(query)).map((category) => {
              return (
                <li className="list-group-item" key={category._id}>
                  {" "}
                  {category.name}{" "}
                  <CategoryRemove
                    slug={category.slug}
                    reload={fetchCategories}
                  />
                  <CategoryUpdate
                    slug={category.slug}
                    reload={fetchCategories}
                  />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h1> Aucune catégories disponibles </h1>
      )}
    </>
  );
};

export default CategoryList;
