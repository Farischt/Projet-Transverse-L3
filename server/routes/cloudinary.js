// Dependencies
const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
const { upload } = require("../controller/cloudinaryController");

router.post("/uploadimages", upload);

module.exports = router;
