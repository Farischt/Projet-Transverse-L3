// Dependencies
const router = require("express").Router();
// Middlewares
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
const { upload, remove } = require("../controller/cloudinaryController");

router.post("/uploadimages", verifyAuth, verifyAdmin, upload);
router.post("/removeimage", verifyAuth, verifyAdmin, remove);

module.exports = router;
