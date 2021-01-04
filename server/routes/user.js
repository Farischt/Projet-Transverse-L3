const router = require("express").Router()
// Middlewares
const { verifyAuth } = require("../middlewares/auth")
// Controllers
const {
  userCart,
  readCart,
  deleteCart,
  applyCouponToCart,
} = require("../controller/userController")

// Route that save user cart in database
router.post("/cart", verifyAuth, userCart)
// Route that get actual user cart
router.get("/cart", verifyAuth, readCart)
// Route that delete a cart
router.delete("/cart", verifyAuth, deleteCart)
// Route that apply coupon to cart total price
router.post("/cart/apply-coupon", verifyAuth, applyCouponToCart)

module.exports = router
