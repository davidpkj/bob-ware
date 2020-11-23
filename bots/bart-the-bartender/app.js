const discord = require("discord.js");
const client = new discord.Client();

const prefix = "$";
const token = "NzgwMTEzNzE3OTExMDkzMjk5.X7qXhA.yJvW_gE7RpyzU8nOAHuJEa7IKB8";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  console.log(msg.member.roles.cache.some((role) => role.name == "hecka"));

  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.bot) return;

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