const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
// Controller
const { create, list, remove } = require("../controller/productController");

// Route to create a product
router.post("/product", verifyAuth, verifyAdmin, create);
// Route to list all products
router.get("/products", list);
// Route that delete a product
router.delete("/product/:slug", verifyAuth, verifyAdmin, remove);

module.exports = router;
