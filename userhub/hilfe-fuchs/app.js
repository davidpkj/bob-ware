const fs = require("fs");
const ip = require("ip");
const colors = require("colors");
const express = require("express");
const app = express();

const port = 8000;
const router = require("./controllers/router");

const logger = require("./handlers/logger");

const readStats = () => {
  let result = {};

  try {
    result = JSON.parse(fs.readFileSync("stats.json"));
  } catch (err) {
    console.error(err);
  }

  return result;
}

const dumpStats = (stats) => {
  try {
    fs.writeFileSync("stats.json", JSON.stringify(stats), {
      flag: 'w+'
    });
  } catch (err) {
    console.error(err);
  }
}

const loghook = (req, res, next) => {
  res.on("finish", () => logger.logHandshake(req, res));
  next();
}

const cookiehook = () => {
  const stats = readStats();

  if (req.originalUrl == "/") {
    stats[event] = stats[event] ? stats[event] + 1 : 1;
    dumpStats(stats);
  }
}

app.use(loghook);
app.use(express.static(__dirname + "/public"));
app.use("/", router);

app.listen(port, console.log(colors.green(`Hilfe Fuchs läuft auf http://${ip.address()}:${port}/`)));
