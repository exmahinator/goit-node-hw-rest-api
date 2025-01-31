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

  if (!user.verify) {
    throw HttpError(
      401,
      "Oh my, oh my... Email is not verified... We can't provide you access until it will not be verified. Please check your email for verification link, check your spam folder, because it may comes there or request new verification link!"
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const loggedUser = await User.findByIdAndUpdate(user._id, {
    token,
    new: true,
  });

  res.json({
    token,
    user: { email: loggedUser.email, subscription: loggedUser.subscription },
  });
};

module.exports = login;
