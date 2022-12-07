const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemes } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemes.updateSubscriptionScheme),
  ctrlWrapper(ctrl.updateSubscription)
);

router.post(
  "/register",
  validateBody(schemes.registerScheme),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemes.loginScheme),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
