const express = require("express");
const { HttpError } = require("../../helpers");
const { Contact, schemes } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");
const { isValidId } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

// router.get("/", async (__, res, next) => {
//   try {
//     const result = await Contact.find();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Contact.findById(id);

//     if (!result) {
//       throw HttpError(404);
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemes.addScheme.validate(req.body);

    if (error) {
      throw HttpError(400);
    }
    const result = await Contact.create(req.body);
    if (!result) {
      throw HttpError(
        404,
        `User with name ${req.body.name} is already exists in your contacts list :( Unable to add ${req.body.name} as a new user...`
      );
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({
      message: `Contact with ID ${id} has been successfully deleted!`,
      deletedContact: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schemes.updateScheme.validate(req.body);

    if (error) {
      throw HttpError(400);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = schemes.updateFavScheme.validate(req.body);

    if (error) {
      throw HttpError(400, "OMG! Missing field favorite :(");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
