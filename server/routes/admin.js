const router = require("express").Router()
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth")
// Controllers
const {
  orders,
  orderStatus,
  grossSalesPerMonth,
  outOfStock,
} = require("../controller/adminController")

// Route that get all the orders from db
router.get("/orders", verifyAuth, verifyAdmin, orders)
// Routes that update an order status
router.put("/orders/:orderId", verifyAuth, verifyAdmin, orderStatus)
// Routes thath get sales per month for 2021 year
router.get("/sales-per-month", verifyAuth, verifyAdmin, grossSalesPerMonth)
// Routes that get all products soon out of stocks
router.get("/out-of-stocks", verifyAuth, verifyAdmin, outOfStock)

module.exports = router
