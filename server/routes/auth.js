// Dependencies
const router = require("express").Router();
// Middlewares
const { verifyConnection, verifyAuth } = require("../helpers/verifyAuth");
// Controllers
const {
  register,
  login,
  logout,
  currentUser,
  updatePassword,
} = require("../controller/authController");

// Register route that create a user in DB
router.post("/register", register);

// Login route that connect the user
router.post("/login", verifyConnection, login);

// Logout route
router.get("/logout", verifyAuth, logout);

// Current user route
router.get("/me", currentUser);

// Update password route
router.put("/password/:_id", verifyAuth, updatePassword);

module.exports = router;
