const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

const { User } = require("../../models/user");
// const { minimizeAvatar } = require("../../helpers/minimizeAvatar");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  console.log("tempUpload:", tempUpload);
  console.log("originalname:", originalname);

  // minimizeAvatar(tempUpload, originalname);

  // const image = await Jimp.read(tempUpload);
  // image.resize(250, 250);
  // image.writeAsync(`mini_${originalname}`);

  // console.log("miniAvatar:", image);

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
