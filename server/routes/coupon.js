const router = require("express").Router()
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth")
// Controllers
const { create, removeCoupon, list } = require("../controller/couponController")

// Route that create a coupon
router.post("/create", verifyAuth, verifyAdmin, create)
// Route that remove a coupon
router.delete("/remove/:couponId", verifyAuth, verifyAdmin, removeCoupon)
// Route that list a coupon
router.get("/", list)

module.exports = router
