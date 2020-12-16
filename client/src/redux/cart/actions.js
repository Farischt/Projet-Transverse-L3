import { addToCart } from "./cartActions"

export const updateCart = (newCart) => {
  return (dispatch) => {
    dispatch(addToCart(newCart))
  }
}
