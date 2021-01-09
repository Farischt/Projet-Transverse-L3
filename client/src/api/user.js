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

export const applyCoupon = async (coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user-action/cart/apply-coupon`,
    { coupon }
  )
}

export const createOrder = async (stripeResponse) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user-action/order`,
    { stripeResponse }
  )
}

export const listOrders = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user-action/orders`)
}

export const getWishList = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/user-action/wishlist`
  )
}

export const addToWishList = async (productId) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user-action/wishlist/${productId}`
  )
}

export const removeFromWishList = async (productId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/user-action/wishlist/${productId}`
  )
}
