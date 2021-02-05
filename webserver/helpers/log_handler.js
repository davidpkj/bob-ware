const colors = require("colors");
const fs = require("fs");
const path = require("path");

const output = `${__dirname}/../logs/${Date.now()}.log`;
const nologfile = `${__dirname}/../.nologs`;

// Catches errors
const onerror = (error) => {
  if (error) log("error", "Log Handler", "Die aktuelle Logdatei konnte nicht beschrieben werden.");
}

// Logs to log file
const logtofile = (sender, message, status = 200, data = null) => {
  if (fs.existsSync(nologfile)) return;

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

log(`info`, `Log Handler`, `Logging active, output is ${output}`);

module.exports = log;