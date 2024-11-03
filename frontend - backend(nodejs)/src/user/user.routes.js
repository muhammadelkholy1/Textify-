const express = require("express");

const { body } = require("express-validator");

const User = require("./user.model");
const { register } = require("./user.controller");
const { findOneUser, login } = require("../common/auth");
const { validationMiddleware } = require("../common/middlewares");

const router = express.Router();

router.post("/register", register);

router.post(
  "/login",
  [
    body("email")
      .exists()
      .withMessage("email is required")
      .trim()
      .isEmail()
      .withMessage("invalid email"),
  ],
  validationMiddleware,
  findOneUser(User),
  login
);

module.exports = router;
