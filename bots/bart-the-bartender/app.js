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

const alcohol = (msg) => {
  switch (msg.content.toLowerCase().substring(1, msg.content.length)){
    case "shot": 
      msg.reply("Kommt sofort!");
      break;
    case "martini":
      msg.reply("Möchten Sie ihn geschüttelt oder gerührt?");
      break;
    case "whiskey":
      msg.reply("Was darf es sein? Ein irischer Single Malt, Tennessee, Bourbon oder doch Scotch?");
      break;
    case "wässerchen":
    case "vodka":
      msg.reply("За здоровье!");
      break;
    case "cocktail":
      msg.reply("Sex On The Beach, Long Island Ice Tea, Piña Colada, Magerita, Moscow Mule oder ein Tequila Sunrise? Wonach ist Ihnen?");
      break;
    case "rum":
      msg.reply("Ein deutscher Meyer's, der venezuelanische Botucal oder womöglich der Plantation Barbados Extra Old? Ein Kenner ist sich der Qualitäten bewusst.");
      break;
    case "gin":
      msg.reply("Eine Gin Tonic auf Eis, kommt sofort!");
      break;
    case "wein":
      msg.reply("Lieblichen und Rosé gibt es hier nicht. Wir haben ungarischen Stierblut, Riesling, Cuvée Especial und den Châteauneuf-du-Pape Les Sinards");
      break;
    case "drinks":
      msg.reply("Ich kann hiermit dienen: Martini, Whiskey, Gin, Vodka, Rum, Wein, Coacktail und einem Shot")
      break;
  }
}

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
