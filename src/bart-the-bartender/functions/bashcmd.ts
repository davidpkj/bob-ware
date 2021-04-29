import * as os from "os";
import { exec } from "child_process";
import * as Discord from "discord.js";

const authorized = ["322769681079336972", "441975703135846401", "500574701652017164"];

const createTempfile = (stdout: string, msg: Discord.Message) => {
  const buffer = Buffer.alloc(stdout.length);

  buffer.write(stdout, "utf-8");

  const attachment = new Discord.MessageAttachment(buffer);

  msg.reply("Der Output ist zu lang, aber hier nimm das:", attachment);
}

export const bashcmd = (client: Discord.Client, msg: Discord.Message) => {
  if (os.hostname() === "manjaro") return;
  if (!authorized.includes(msg.author.id)) return;

  const message = msg.content.toLowerCase().substring(1, msg.content.length).split(" ");

  message.shift();
  client.user.setPresence({ status: "idle" });

  exec(message.join(" "), (error, stdout, _) => {
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