const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");

const { HttpError, sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(
      409,
      `We're sorry but email ${email} is already in use... Please create a new one`
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = createVerifyEmail(email, verificationToken);

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    message:
      "Registration is successful! Please check your mailbox for verification email to activate your account! If it is not in your Inbound folder - please check your Spam folder. Without verification, log in will not be possible. If verification email will not be received - please request resend verification code!",
  });
};

module.exports = register;
