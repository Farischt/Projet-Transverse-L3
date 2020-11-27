const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
// Controller
const { create } = require("../controller/productController");

// Route
router.post("/", verifyAuth, verifyAdmin, create);

module.exports = router;
