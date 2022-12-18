const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const dotenv = require("dotenv");
dotenv.config();

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

const avatarsDir = path.join(__dirname, "public", "avatars");
// upload.fields([{name: "cover", maxCount: 8}]) - if there are several fields, up to 8, in one request
// upload.array("cover", 8) - if field "cover" contains up to 8 files
app.patch("/api/users/avatars", upload.single("cover"), async (res, req) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const {
    status = 500,
    message = "Server error :( Our work squirrels are doing their best to fix the issue...",
  } = err;
  res.status(status).json({ status, message });
});

module.exports = app;
