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

module.exports = router
