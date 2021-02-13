const colors = require("colors");
const path = require("path");
const fs = require("fs");

const output = `${__dirname}/../logs/${Date.now()}.log`;
const nologfile = `${__dirname}/../.nologs`;
let disableActiveLogging = false;

// Catches errors
const onerror = (error) => {
  if (error) log("error", "Log Handler", "Die aktuelle Logdatei konnte nicht beschrieben werden.");
}

// Logs to log file
const logtofile = (sender, message, status = 200, data = null) => {
  if (disableActiveLogging) return;

  const date = new Date().toLocaleString();
  
  if (!fs.existsSync(path.dirname(output))) fs.mkdirSync(path.dirname(output));

  fs.appendFile(output, `[ ${sender} ] [ ${date} ] [ ${status} ] ${message}\n`, onerror);
  if (data) fs.appendFile(output, `${data}\n`, onerror);
}

// Logs to console
const log = (type, sender, message, status, append = true, data = null) => {
  colors.setTheme({
    info: "green",
    warn: "yellow",
    error: "red"
  })

  console.log(`[ ${sender.toString()[type]} ] [ ${new Date().toLocaleString().grey} ] ` + (status ? `[ ${status.toString()[type]} ] ${message}` : message.toString()));

  if (append) logtofile(sender, message, status, data);
}

if (fs.existsSync(nologfile)) disableActiveLogging = true;

if (disableActiveLogging) {
  log(`info`, `Log Handler`, `Logging ist passiv`);
} else {
  log(`info`, `Log Handler`, `Logging ist aktiv, output ist ${output}`);
}

module.exports = log;