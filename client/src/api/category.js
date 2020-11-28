import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);
};

export const removeCategory = async (slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/category/${slug}`
  );
};

export const updateCategory = async (slug, newCategory) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    newCategory
  );
};

export const createCategory = async (category) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/category`,
    category
  );
};
