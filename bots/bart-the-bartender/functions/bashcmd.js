const sys = require("util");
const exec = require("child_process").exec;

const authorized = ["322769681079336972", "441975703135846401", "500574701652017164"];

module.exports = bashcmd = (msg) => {
  if (!authorized.includes(msg.author.id)) return;

  let answer = "";
  const message = msg.content.toLowerCase().substring(1, msg.content.length).split(" ");

  message.shift();

  command = exec(message.join(" "), (err, stdout, _) => {
    if (err) {
      console.error(err);
    }

    answer = answer + stdout;
    msg.reply(answer);
  });
  
  command.on("exit", (code) => {
    answer = answer + code + "\n";
  });
}