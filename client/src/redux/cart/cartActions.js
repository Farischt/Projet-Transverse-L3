import { ADD_TO_CART } from "./cartTypes"

export const addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    payload: cart,
  }
}
