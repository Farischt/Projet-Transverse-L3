const router = require("express").Router()
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth")
// Controllers
const { orders, orderStatus } = require("../controller/adminController")

// Route that get all the orders from db
router.get("/orders", verifyAuth, verifyAdmin, orders)
// Routes that update an order status
router.put("/orders/:orderId", verifyAuth, verifyAdmin, orderStatus)

module.exports = router
