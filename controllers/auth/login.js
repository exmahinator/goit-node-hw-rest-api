const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(
      401,
      "We're sorry, but email is invalid. Please doublecheck the correctness of entered email..."
    );
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(
      401,
      "We're sorry, but password is invalid. Please doublecheck the correctness of entered password or reset it..."
    );
  }

  const token = "!243.gdfgfg.56462";

  res.json({
    token,
  });
};

module.exports = login;
