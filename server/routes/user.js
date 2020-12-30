const router = require("express").Router()
// Middlewares
const { verifyAuth } = require("../middlewares/auth")
// Controllers
const {
  userCart,
  readCart,
  deleteCart,
} = require("../controller/userController")

// Route that save user cart in database
router.post("/cart", verifyAuth, userCart)
// Route that get actual user cart
router.get("/cart", verifyAuth, readCart)
// Route that delete a cart
router.delete("/cart", verifyAuth, deleteCart)

module.exports = router
