const discord = require("discord.js");
const client = new discord.Client();

const token = require("./token");
const prefix = "$";

const alcohol = require("./functions/alcohol");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot || !msg.content.startsWith(prefix)) return;

  if (msg.channel.type != "text") {
    msg.reply("Privater Kundeservice kostet extra! :smirk:");
    return;
  }

  if (!msg.member.roles.cache.some((role) => role.name == "hecka")) return;

  let message = msg.content.toLowerCase().substring(1, msg.content.length);

  if (commands[message]) {
    commands[message](msg);
  } else {
    unknownCommand(msg);
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
