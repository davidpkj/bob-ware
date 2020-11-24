const discord = require("discord.js");
const client = new discord.Client();

const token = require("./token");
const prefix = "$";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.bot) return;
  if (!msg.member.roles.cache.some((role) => role.name == "hecka")) return;

  let message = msg.content.toLowerCase().substring(1, msg.content.length);

  switch (message) {
    case "shot":
      msg.reply("kommt sofort");
      break;
    default: 
      unknownCommand(msg);
  }
});

const unknownCommand = (msg) => {
  const phrases = [
    "Was willst du?",
    "Sprich Deutsch!",
    "Sehe ich auch so..."
  ];

  msg.reply(phrases[Math.floor(Math.random()) * phrases.length]);
}

client.login(token);
