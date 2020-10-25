const colors = require("colors");

const _chooseStatusCode = (statusCode) => {
  switch (statusCode.charAt(0)) {
    case "1":
      return colors.blue(statusCode);
    case "2":
      return colors.green(statusCode);
    case "3":
      return colors.yellow(statusCode);
    case "4":
    case "5":
      return colors.red(statusCode);
  }
}

const logHandshake = (req, res) => {
  console.log(`[ ${_chooseStatusCode(res.statusCode.toString())} ] [ ${colors.grey(new Date(Date.now()).toLocaleString("de"))} ] ${req.method} ${req.originalUrl}`);
}

module.exports = {
  logHandshake: logHandshake
}
