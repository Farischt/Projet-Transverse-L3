import React, { useState, useEffect } from "react";
import { getCategories } from "../../../api/category";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryRemove from "./CategoryRemove";

const CategoryList = () => {
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
    <>
      {categoriesLoading ? (
        <div className="text-center">
          {" "}
          <Spinner animation="border" variant="info" />{" "}
        </div>
      ) : categories.length ? (
        <ListGroup>
          <h1> Liste des catégories </h1>
          {categories.map((category) => {
            return (
              <ListGroup.Item key={category._id}>
                {" "}
                {category.name}{" "}
                <CategoryRemove slug={category.slug} reload={fetchCategories} />
                <button className="btn btn my-2 my-sm-0 float-right">
                  <EditOutlined />
                </button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <h1> Aucune catégories disponibles </h1>
      )}
    </>
  );
};

export default CategoryList;
