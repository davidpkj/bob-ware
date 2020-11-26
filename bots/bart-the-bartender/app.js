const discord = require("discord.js");
const client = new discord.Client();

const token = require("./token");
const prefix = "$";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  if (!msg.member.roles.cache.some((role) => role.name == "hecka")) return;

  let message = msg.content.toLowerCase().substring(1, msg.content.length);

  if (commands[message]) {
    commands[message](msg);
  } else {
    unknownCommand(msg);
  }
});

const shot = (msg) => {
  msg.reply("kommt sofort!");
}

const commands = {
  "shot": shot,
}

const unknownCommand = (msg) => {
  const phrases = [
    "Was willst du?",
    "Sprich Deutsch!",
    "Sehe ich auch so..."
  ];

  const random = Math.floor(Math.random()) * phrases.length;

  msg.reply(phrases[random]);
}

client.login(token);
