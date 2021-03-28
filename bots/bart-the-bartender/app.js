const discord = require("discord.js");
const client = new discord.Client();

const token = require("./token");
const prefix = "&";

const audio = require("./functions/audio");
const alcohol = require("./functions/alcohol");
const bashcmd = require("./functions/bashcmd");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot || !msg.content.startsWith(prefix)) return;

  if (msg.channel.type != "text") {
    msg.reply("Privater Kundeservice kostet extra! :smirk:");
    return;
  }

  if (!msg.member.roles.cache.some((role) => role.id == "783393629598908527")) return;

  let message = msg.content.toLowerCase().substring(1, msg.content.length).split(" ")[0];

  try {
    if (commands[message]) {
      console.log(`[ ${new Date().toLocaleString()} ] (OK) ${msg.author.username}: ${msg}`);
      commands[message](client, msg);
    } else {
      console.log(`[ ${new Date().toLocaleString()} ] (ERROR) ${msg.author.username}: ${msg}`);
      unknownCommand(msg);
    }
  } catch (e) {
    msg.reply("Ein Fehler ist aufgetreten!");
    console.error(e);
  }
});

const commands = {
  "shot": alcohol,
  "martini": alcohol,
  "whiskey": alcohol,
  "gin": alcohol,
  "wässerchen": alcohol,
  "cocktail": alcohol,
  "vodka": alcohol,
  "rum": alcohol,
  "wein": alcohol,
  "drinks": alcohol,
  "bash": bashcmd,
  "play": audio.play,
  "stop": audio.stop,
  "pause": audio.pause,
  "resume": audio.resume,
  "skip": audio.skip,
  "np": audio.nowplaying
}

const unknownCommand = (msg) => {
  const phrases = [
    "Was willst du?",
    "Sprich Deutsch!",
    "Mhm, sehe ich auch so..."
  ];

  const random = Math.floor(Math.random()) * phrases.length;

  msg.reply(phrases[random]);
}

client.login(token);
