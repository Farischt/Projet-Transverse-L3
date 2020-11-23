import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`/api/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`/api/category/${slug}`);
};

export const removeCategory = async (slug) => {
  return await axios.delete(`/api/category/${slug}`);
};

export const updateCategory = async (slug, newCategory) => {
  return await axios.put(`/api/category/${slug}`, newCategory);
};

export const createCategory = async (category) => {
  return await axios.post(`/api/category`, category);
};
