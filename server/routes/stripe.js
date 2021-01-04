const router = require("express").Router()
// Controllers
const { createPaymentIntent } = require("../controller/stripeController")
// Middlewares
const { verifyAuth } = require("../middlewares/auth")

// Routes
router.post("/payment-intent", verifyAuth, createPaymentIntent)

module.exports = router
