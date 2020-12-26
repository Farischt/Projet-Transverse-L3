import axios from "axios"

export const userCart = async (cart) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/user/cart`, {
    cart,
  })
}
