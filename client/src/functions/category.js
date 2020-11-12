import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.URL}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.URL}/category/${slug}`);
};

export const removeCategory = async (slug) => {
  return await axios.delete(`${process.env.URL}/category/${slug}`);
};

export const updateCategory = async (slug, newCategory) => {
  return await axios.put(`${process.env.URL}/category/${slug}`, newCategory);
};

export const createCategory = async (category) => {
  return await axios.post(`${process.env.URL}/category`, category);
};
