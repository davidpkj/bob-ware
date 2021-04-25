import { log } from "../helpers/log_handler";

import { Router } from "express";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";

export const router = Router();

const cloudDataDirectory = path.join(__dirname, "../data/cloud/content/");

// Generates suitable filename for Cloud // TODO: Move to backend util
const optimizeFilename = (string: string) => {
  string.replace(/ /g, "_");

  const date = new Date().toISOString().split("T")[0];

  return `${date}-${string}`;
}

// Saves files to disk // TODO: Move to backend util
const diskStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, cloudDataDirectory);
  },
  filename: (_, file, cb) => {
    cb(null, optimizeFilename(file.originalname));
  }
});

const htmlpath = path.join(__dirname, "../public/views/");

// Dashboard
router.get(["/", "/dashboard"], (_, res) => {
  res.sendFile(`${htmlpath}/dashboard.html`);
});

// Poker
router.get(["/poker"], (_, res) => {
  res.sendFile(`${htmlpath}/poker.html`);
});

// Cloud
router.get(["/cloud"], (_, res) => {
  res.sendFile(`${htmlpath}/cloud.html`);
});

// Cloud download
router.get(["/cloud/:file"], (req, res) => {
  const respond = () => {
    const code = 500;

    res.status(code).render(`${htmlpath}/error.ejs`, {code: code});
    log("error", "Cloud System", "Download ist fehlgeschlagen", code);
  }

  if (!fs.existsSync(cloudDataDirectory)) {
    fs.mkdir(cloudDataDirectory, () => log);
    respond();
    return;
  }

  res.download(path.join(__dirname, `${cloudDataDirectory}${req.params["file"]}`), (error) => {    
    if (error) {
      respond();
    } else {
      log("info", "Cloud System", `Download wurde genehmigt`);
    }
  });
});

// Cloud upload
router.post("/cloud/upload", multer({storage: diskStorage}).single("file"), (_, res) => {
  res.sendStatus(200);
});

// 404
router.get("*", (_, res) => {
  res.status(404).render(`${htmlpath}/error.ejs`, {code: 404});
});