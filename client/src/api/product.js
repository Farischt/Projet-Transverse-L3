import axios from "axios";

export const createProduct = async (product) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product);
};

export const listProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products`);
};
