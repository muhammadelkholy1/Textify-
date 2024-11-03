const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const extract_text = require("./ocr.contorller");

const upload = multer({
  dest: path.join(__dirname, "temp"), // Set temporary directory
  limits: { fileSize: 5 * 1024 * 1024 }, // Maximum file size: 5 MB
});

router.post("/", upload.single("avatar"), extract_text);

module.exports = router;
