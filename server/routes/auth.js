// Dependencies
const router = require("express").Router()
// Middlewares
const {
  verifyConnection,
  verifyAuth,
  verifyAdmin,
} = require("../middlewares/auth")
// Controllers
const {
  register,
  login,
  logout,
  currentUser,
  updatePassword,
} = require("../controller/authController")

// Register route that create a user in DB
router.post("/register", register)
// Login route that connect the user
router.post("/login", verifyConnection, login)
// Logout route
router.get("/logout", verifyAuth, logout)
// Current user route
router.get("/me", verifyAuth, currentUser)
// Current admin route
router.get("/admin", verifyAuth, verifyAdmin, currentUser)
// Update password route
router.put("/password", verifyAuth, updatePassword)

module.exports = router
