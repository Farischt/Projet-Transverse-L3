import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  EMPTY_CART,
} from "./cartTypes"

export const addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    payload: cart,
  }
}

export const removeFromCart = (cart) => {
  return {
    type: REMOVE_FROM_CART,
    payload: cart,
  }
}

export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    payload: cart,
  }
}

export const emptyCart = (cart) => {
  return {
    type: EMPTY_CART,
    payload: cart,
  }
}
