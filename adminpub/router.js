const path = require("path");
const express = require('express');
const router = express.Router();

router.get(["/", "/dashboard"], (_, res) => {
  res.sendFile(__dirname + "/dashboard/index.html");
});

router.get(["/poker"], (_, res) => {
  res.sendFile(__dirname + "/poker/index.html");
}),

router.get("*", (_, res) => {
  res.sendFile(__dirname + "/notfound.html")
});

module.exports = router;
