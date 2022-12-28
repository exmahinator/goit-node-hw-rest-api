const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email to continue with our services</a>`,
    from: "",
  };
  return verifyEmail;
};
module.exports = createVerifyEmail;
