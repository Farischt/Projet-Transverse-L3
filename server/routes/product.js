const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
// Controller
const {
  create,
  read,
  listAll,
  remove,
  list,
  productsTotal,
  listPagination,
  rate,
  listRelated,
  searchWithFilters,
} = require("../controller/productController");

// Route to create a product
router.post("/product", verifyAuth, verifyAdmin, create);
// Route to read a product
router.get("/product/:slug", read);
// Route to list all products
router.get("/products", listAll);
// Route that delete a product
router.delete("/product/:slug", verifyAuth, verifyAdmin, remove);
// Route that get products with specific criteras
router.post("/products", list);
// Route that get the total of products
router.get("/products/total", productsTotal);
// Route that get a list of products to be paginated
router.post("/products/page", listPagination);
// Route that apply a rate to a product
router.put("/product/rating/:productId", verifyAuth, rate);
// Route to read a product
router.get("/product/related/:productId", listRelated);
// Route that
router.post("/search/filters", searchWithFilters);

module.exports = router;
