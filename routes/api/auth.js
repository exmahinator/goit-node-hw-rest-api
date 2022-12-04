const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const { schemes } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemes.registerScheme),
  ctrlWrapper(ctrl.register)
);

// signin
router.post(
  "/login",
  validateBody(schemes.loginScheme),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
