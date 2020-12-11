const sortiment = {
  "shot": "Kommt sofort!",
  "martini": "Möchten Sie ihn geschüttelt oder gerührt?",
  "whiskey": "Was darf es sein? Ein irischer Single Malt, Tennessee, Bourbon oder doch Scotch?",
  "wässerchen": "За здоровье!",
  "vodka": "За здоровье!",
  "cocktail": "Sex On The Beach, Long Island Ice Tea, Piña Colada, Magerita, Moscow Mule oder ein Tequila Sunrise? Wonach ist Ihnen?",
  "rum": "Ein deutscher Meyer's, der venezuelanische Botucal oder womöglich der Plantation Barbados Extra Old? Ein Kenner ist sich der Qualitäten bewusst.",
  "gin": "Eine Gin Tonic auf Eis, kommt sofort!",
  "wein": "Lieblichen und Rosé gibt es hier nicht. Wir haben ungarischen Stierblut, Riesling, Cuvée Especial und den Châteauneuf-du-Pape Les Sinards",
  "drinks": "Ich kann hiermit dienen: Martini, Whiskey, Gin, Vodka, Rum, Wein, Coacktail und einem Shot",
}

module.exports = alcohol = (msg) => {
  msg.reply(sortiment[msg.content.toLowerCase().substring(1, msg.content.length)]);
}
