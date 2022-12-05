const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "email");
  res.json(result);
};

module.exports = getAllContacts;
