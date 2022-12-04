const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const addContact = async (req, res) => {
  const email = req.body.email;
  const isPresent = await Contact.findOne({ email });
  if (isPresent === null) {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
    return;
  }
  throw HttpError(
    404,
    `User with email ${req.body.email} is already exists in your contacts list :( Unable to add new user...`
  );
};

module.exports = addContact;
