const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const contactScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please, set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactScheme.post("save", handleSaveErrors);

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

const updateFavScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemes = {
  addScheme,
  updateScheme,
  updateFavScheme,
};

const Contact = model("contact", contactScheme);

module.exports = { Contact, schemes };
