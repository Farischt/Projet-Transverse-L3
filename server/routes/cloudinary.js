// Dependencies
const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
const { upload } = require("../controller/cloudinaryController");

router.post("/uploadimages", verifyAuth, verifyAdmin, upload);

module.exports = router;
