const router = require("express").Router()
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth")
// Controllers
const { userCart } = require("../controller/userController")

router.post("/cart", verifyAuth, userCart)

module.exports = router
