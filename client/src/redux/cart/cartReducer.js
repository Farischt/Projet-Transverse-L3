import { ADD_TO_CART } from "./cartTypes"

const getCartFromLocalStorage = () => {
  if (window && localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"))
  }
  let emptyCart = []
  return emptyCart
}

const initialeState = getCartFromLocalStorage()

export const cartReducer = (state = initialeState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload
    default:
      return state
  }
}
