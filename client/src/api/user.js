import axios from "axios"

export const userCart = async (cart) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/user-action/cart`, {
    cart,
  })
}

export const getUserCart = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user-action/cart`)
}

export const deleteUserCart = async () => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/user-action/cart`)
}
