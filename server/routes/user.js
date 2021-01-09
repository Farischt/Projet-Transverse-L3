const router = require("express").Router()
// Middlewares
const { verifyAuth } = require("../middlewares/auth")
// Controllers
const {
  userCart,
  readCart,
  deleteCart,
  applyCouponToCart,
  createOrder,
  listOrders,
  addToWishList,
  wishList,
  removeFromWishList,
} = require("../controller/userController")

// Route that save user cart in database
router.post("/cart", verifyAuth, userCart)
// Route that get actual user cart
router.get("/cart", verifyAuth, readCart)
// Route that delete a cart
router.delete("/cart", verifyAuth, deleteCart)
// Route that apply coupon to cart total price
router.post("/cart/apply-coupon", verifyAuth, applyCouponToCart)
// Route that send order
router.post("/order", verifyAuth, createOrder)
// Route that get all the orders for a specific user
router.get("/orders", verifyAuth, listOrders)
// Route that add an item to wishlist
router.post("/wishlist/:productId", verifyAuth, addToWishList)
// Route that get a wishlist
router.get("/wishlist", verifyAuth, wishList)
// Route that delete a product from wishlist
router.delete("/wishlist/:productId", verifyAuth, removeFromWishList)

module.exports = router
