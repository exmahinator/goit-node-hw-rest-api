const express = require("express");
const { schemes } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");
const { isValidId, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemes.addScheme), ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  isValidId,
  validateBody(schemes.updateScheme),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemes.updateFavScheme),
  ctrlWrapper(ctrl.updateContactFav)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deleteContact));

module.exports = router;
