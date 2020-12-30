import { addToCart, removeFromCart, updateCart, emptyCart } from "./cartActions"
import { toast } from "react-toastify"

//? Add a product to cart (bypass)
export const addProductToCart = (product) => {
  return (dispatch) => {
    let cart = []
    if (window) {
      // if cart is available in local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      let existingProduct = cart.find((element) => element._id === product._id)
      if (!existingProduct) {
        cart.push({
          ...product,
          userQuantity: 1,
        })
      }
      localStorage.setItem("cart", JSON.stringify(cart))
    }
    dispatch(addToCart(cart))
  }
}

//? Remove an item from cart
export const removeProductFromCart = (product) => {
  return (dispatch) => {
    let cart = []
    if (window) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
        const newCart = cart.filter((element) => element._id !== product._id)
        localStorage.setItem("cart", JSON.stringify(newCart))
        dispatch(removeFromCart(newCart))
      }
    }
  }
}

//? Update cart
export const updateQuantity = (product, quantity) => {
  return (dispatch) => {
    if (isNaN(parseInt(quantity))) {
      return toast.error("Veuillez saisir un nombre valide")
    }
    let selectedQuantity = quantity > 1 ? quantity : 1
    if (selectedQuantity > product.quantity) {
      return toast.error("Attention vous avez atteint la quantité maximale")
    }
    let cart = []
    if (window && localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
      let productIndex = cart.findIndex(
        (element) => element._id === product._id
      )
      if (productIndex !== -1) {
        cart[productIndex].userQuantity = parseInt(selectedQuantity)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch(updateCart(cart))
      }
    }
  }
}

//? Empty Cart
export const eraseCart = () => {
  return (dispatch) => {
    if (window) {
      localStorage.removeItem("cart")
      let cart = []
      dispatch(emptyCart(cart))
    }
  }
}
