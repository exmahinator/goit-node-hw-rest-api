const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(
      409,
      `We're sorry but email ${email} is already in use... Please create a new one`
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
