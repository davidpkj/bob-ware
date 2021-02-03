const game = require("./models/game_class");
const Player = require("../backend/models/player_class");
const log = require("../../helpers/log_handler");
const fs = require("fs");

let players = JSON.parse(fs.readFileSync(`${__dirname}/models/accounts.json`, {encoding: "utf-8"})).accounts; // Array mit Spielerobjekten des JSON files

const join = (pName) => { // überprüft ob es den Acc schon gibt, sonst erstellt ihn und gibt Chips wieder
  let pAcc = players.filter( (player) => player.name == pName);
  if ( pAcc.length ==  1 ) {
    return pAcc[0].chips;
  } else if ( pAcc.length > 1 ) {
    console.log("FEHLER: Es gibt zwei Accounts mit dem Gleichen Namen") //  wird hoffentlich nicht ausgelöst
    return "FEHLER: Es gibt zwei Accounts mit dem Gleichen Namen";
  } else {
    players.push(new Player(pName));
    join(pName) // um das Array pAcc zu aktualisieren
  }
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    log("info", "Poker Server", "Ein Client hat eine Verbindung aufgebaut");

    // Antwortet mit "yourStets" die Chips des Spielers
    socket.on("join", (pName) => {
      socket.emit("yourStets", join(pName));      
    });
    // Poker communication logic

    socket.on("disconnect", () => {
      log("info", "Poker Server", "Ein Client hat seine Verbindung unterbrochen");
    });
  });
}

game.start();
