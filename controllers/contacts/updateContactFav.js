const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateContactFav = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateContactFav;
