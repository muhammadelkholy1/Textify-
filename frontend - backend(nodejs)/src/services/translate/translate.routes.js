const express = require("express");

const translator = require("./translate.contorller");

const router = express.Router();

router.use("/", translator);

module.exports = router;
