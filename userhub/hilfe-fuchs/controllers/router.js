const path = require("path");
const express = require('express');
const router = express.Router();

const viewsdir = `${path.join(__dirname, "../")}public/`

router.get("/", (_, res) => {
  res.sendFile(viewsdir + "views/index.html");
});

router.get(["/explanation/audio", "/explanation/video", "/explanation/licht", "/explanation/rigging"], (_, res) => {
  res.sendFile(viewsdir + "views/explanation.html");
});

router.get(["/faq/audio", "/faq/video", "/faq/licht", "/faq/rigging"], (_, res) => {
  res.sendFile(viewsdir + "views/faq.html");
});

// Fix
router.get(["/vokabular"], (_, res) => {
  res.sendFile(viewsdir + "views/notfound.html");
}),

router.get("*", (_, res) => {
  res.sendFile(viewsdir + "views/notfound.html")
});

module.exports = router;
