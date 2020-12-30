import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  EMPTY_CART,
} from "./cartTypes"

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
    case REMOVE_FROM_CART:
      return action.payload
    case UPDATE_CART:
      return action.payload
    case EMPTY_CART:
      return action.payload
    default:
      return state
  }
}
