const express = require("express");
const router = express.Router();

const docx2pdf = require("./fileconvertor.contorller");

router.post("/docx-to-pdf", docx2pdf);

module.exports = router;
