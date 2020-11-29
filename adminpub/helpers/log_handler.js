const colors = require("colors");

class Log {
  constructor (type, sender, message) {
    this.type = type;
    this.sender = sender;
    this.message = message;

    switch (this.type) {
      case "info":
        console.log(`[ ` +  colors.green(`${this.sender}`) + colors.white(` ] [ ` + colors.grey(`${new Date().toLocaleString()}`) + colors.white(` ] ${this.message}`))); 
        break;
      case "warn":
        console.log(`[ ` +  colors.yellow(`${this.sender}`) + colors.white(` ] [ ` + colors.grey(`${new Date().toLocaleString()}`) + colors.white(` ] `) + colors.yellow(`${this.message}`))); 
        break;
      case "error":
        console.log(`[ ` +  colors.red(`${this.sender}`) + colors.white(` ] [ ` + colors.grey(`${new Date().toLocaleString()}`) + colors.white(` ] `) + colors.red(`${this.message}`))); 
        break;
    }
  }
}

module.exports = Log;