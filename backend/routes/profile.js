const express = require("express");
const profileActions = require("../controller/actions");
var multer = require("multer");
const upload = multer();
const router = express.Router();


router.post("/api/upload", upload.single("cvUpload"), profileActions.upload);

module.exports = router;