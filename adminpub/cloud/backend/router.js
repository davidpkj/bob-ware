const multer = require("multer");
const express = require('express');
const router = express.Router();
const path = require("path");

const optimizeFilename = (string) => {
  string.replace(/ /g, "_");

  const date = new Date().toISOString().split("T")[0];

  return `${date}-${string}`;
}

const diskStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "cloud/backend/content/");
  },
  filename: (_, file, cb) => {
    cb(null, optimizeFilename(file.originalname));
  }
});

router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

router.post("/upload", multer({storage: diskStorage}).single("file"), (_, res) => {
  res.sendStatus(200);
});

module.exports = router;