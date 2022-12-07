const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: `Contact with ID ${id} has been successfully deleted!`,
    deletedContactInfo: result,
  });
};

module.exports = deleteContact;
