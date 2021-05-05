import * as Discord from "discord.js";

import { log } from "../helpers/log_handler";
import { controls } from "./functions/audio";
import { bashcmd } from "./functions/bashcmd";
import * as alcohol from "./functions/alcohol";

const client = new Discord.Client();

client.on("ready", () => {
  log(`info`, `Bart Bot`, `Logged in as ${client.user.tag}!`);
});

client.on("message", (msg: Discord.Message) => {
  if (msg.author.bot || !msg.content.startsWith(process.env.DISCORD_PREFIX)) return;
  if (!msg.member.roles.cache.some((role: any) => role.id == "783393629598908527")) return;
  if (msg.channel.type != "text") {
    msg.reply("Privater Kundeservice kostet extra! :smirk:");
    return;
  }

  let message: string = msg.content.toLowerCase().substring(1, msg.content.length).split(" ")[0];

  try {
    if (commands[message] || alcohol.sortiment[message]) {
      log(`info`, `Bart Bot`, `[ ${new Date().toLocaleString()} ] (OK) ${msg.author.username}: ${msg}`);
      commands[message] ? commands[message](client, msg) : alcohol.serve(null, msg);
      return;
    }

    unknownCommand(msg);
  } catch (e) {
    msg.reply("Ein Fehler ist aufgetreten!");
    console.error(e);
  }
});

const commands: any = {
  "bash": bashcmd,
  "play": controls.play,
  "stop": controls.stop,
  "pause": controls.pause,
  "resume": controls.resume,
  "skip": controls.skip,
  "np": controls.nowplaying,
};

const unknownCommand = (msg: Discord.Message) => {
  const phrases = [
    "Was willst du?",
    "Sprich Deutsch!",
    "Mhm, sehe ich auch so...",
  ];

  const random = Math.floor(Math.random()) * phrases.length;

  log(`info`, `Bart Bot`, `[ ${new Date().toLocaleString()} ] (ERROR) ${msg.author.username}: ${msg}`);
  msg.reply(phrases[random]);
};

export const bartbot = () => {
  client.login(process.env.DISCORD_TOKEN);
}
