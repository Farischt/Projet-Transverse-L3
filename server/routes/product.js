const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
// Controller
const { create, list } = require("../controller/productController");

// Route to create a product
router.post("/product", verifyAuth, verifyAdmin, create);
// Route to list all products
router.get("/products", list);

module.exports = router;
