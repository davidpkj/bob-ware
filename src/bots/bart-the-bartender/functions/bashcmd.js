const fs = require("fs");
const os = require("os");
const sys = require("util");
const exec = require("child_process").exec;

const authorized = ["322769681079336972", "441975703135846401", "500574701652017164"];

const createTempfile = (stdout, msg) => {
  const tempfile = `/tmp/${Date.now()}-output.txt`;

  fs.writeFileSync(tempfile, stdout);
  msg.reply("der Output ist zu lang, aber hier nimm das:", { files: [tempfile] });
  fs.unlinkSync(tempfile);
}

module.exports = bashcmd = (client, msg) => {
  if (os.hostname() === "manjaro") return;
  if (!authorized.includes(msg.author.id)) return;

  const message = msg.content.toLowerCase().substring(1, msg.content.length).split(" ");

  message.shift();
  client.user.setPresence({ status: "idle" });

  command = exec(message.join(" "), (error, stdout, _) => {
    let answer = error ? `${error.code}\n${error.message}` : `0\n${stdout}`;

    try {
      if (answer.length < 2000) {
        msg.reply(answer);
      } else {
        createTempfile(stdout, msg);
      }
    } catch (e) {
      console.log(e);
    } finally {
      client.user.setPresence({ status: "online" });
    }
  });
}