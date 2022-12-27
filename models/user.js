const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userScheme = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 7,
      required: [true, "Set password for user, min - 7 symbols"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: { type: String, required: true },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

userScheme.post("save", handleSaveErrors);

const registerScheme = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
  subscription: Joi.string(),
});

const loginScheme = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const verificationScheme = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSubscriptionScheme = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemes = {
  registerScheme,
  loginScheme,
  updateSubscriptionScheme,
  verificationScheme,
};

const User = model("user", userScheme);

module.exports = {
  User,
  schemes,
};
