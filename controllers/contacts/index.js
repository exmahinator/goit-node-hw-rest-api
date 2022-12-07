const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateContactFav = require("./updateContactFav");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactFav,
};
