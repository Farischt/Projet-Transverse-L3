// Dependencies
const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
// Controllers
const {
  create,
  list,
  read,
  remove,
  update,
} = require("../controller/categoryController");

// Route to create a new category
router.post("/category", verifyAuth, verifyAdmin, create);
// Route to list all the categories
router.get("/categories", list);
// Route to read a specific category
router.get("/category/:slug", read);
// Route to remove a category
router.delete("/category/:slug", verifyAuth, verifyAdmin, remove);
// Route to update a category
router.put("/category/:slug", verifyAuth, verifyAdmin, update);
module.exports = router;
