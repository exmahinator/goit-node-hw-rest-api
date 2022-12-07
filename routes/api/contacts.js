const express = require("express");
const { schemes } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");
const { isValidId, validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAllContacts));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validateBody(schemes.addScheme),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemes.updateScheme),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemes.updateFavScheme),
  ctrlWrapper(ctrl.updateContactFav)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteContact));

module.exports = router;
