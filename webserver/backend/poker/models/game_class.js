const log = require("../../../helpers/log_handler");
const Player = require("../models/player_class");
const Util = require("../../../helpers/util");
const fs = require("fs");

let interval;

class Game {
  running = false;
  tableCards = [];
  currentPlayers = [];
  lastBet = 0;
  pot = 0;

  // Versucht eine Runde zu starten (gibt true bei Erfolg aus)
  async tryGameStart(gameStarting) {
    const players = this.currentPlayers;

    if (this.running == true || players.length > 8 || players.length < 2 || interval != null) {
      log(`warn`, `Poker System`, `Poker kann nicht starten (running: ${this.running}, players: ${players.length}, counting: ${interval ? true : false})`);
      return false;
    }

    let time = 5;

    interval = setInterval(() => {
      if (players.length < 2 || time == 0) {
        clearInterval(interval);
        interval = null;

        if (time == 0) {
          this.running = true;
          this.startGame(gameStarting);
          return true;
        }

        return false;
      }

      time--;
    }, 1000);
  }

  // Startet ein Spiel KEINE RUNDE // TODO: Rename
  startGame(gameStarting) {
    const dealer = require("../models/dealer_class");
    this.setBlinds();

    // TODO: IMPLEMENT ROUNDS
    log("info", "Poker System", "Eine Runde Poker beginnt");
    gameStarting();
  }

  // Setzt die Blinds für die Spieler
  setBlinds() {
    const blinds = ["Dealer", "Small Blind", "Big Blind"];
    const players = this.currentPlayers;

    const loopBlinds = (startIndex) => {
      for (let i = 0; i < 3; i++) {
        if (i == 0 && players == 2) continue;
        if (startIndex + i == players.length) startIndex = 0 - i;

        players[startIndex + i].blind = blinds[i];
      }
    }

    if (Util.allObjectsOfArrayWithProperty(players, "blind", "").length == players.length) {
      let random = Util.randomNumber(0, players.length);

      loopBlinds(random);
    } else {
      let target = players.indexOf(Util.objectOfArrayWithProperty(players, "blind", "Small Blind"))

      for (let player of players) {
        player.blind = "";
      }

      loopBlinds(target);
    }
  }

  // Liest mögliche Spielerinformation aus
  getUserData(name) {
    const userlist = `${__dirname}/../data/userlist.json`;
    const json = JSON.parse(fs.readFileSync(userlist, {encoding: "utf-8"}));

    for (let player of json) {
      if (player.name == name) return player;
    }

    return {};
  }

  // Evaluiert die Nachricht eines Spielers in Bezug auf mögliche Befehle
  evaluateMessage(message, socketid) {
    const msg = message.toLowerCase().trim();
    const commands = ["call", "check", "raise", "pass", "quit"];
    let player = Util.objectOfArrayWithProperty(this.currentPlayers, "id", socketid);
    let type = "chit";
    let response;

    if (commands.includes(msg.split(" ")[0])) {
      type = "command";
      console.log(msg.split(" "));
      response = player[msg.split(" ")[0]](msg);
    }

    return {sender: player.name, content: message, type: type, system: response};
  }

  // Tritt dem System bei außer Spiel Läuft
  async join(name, socketid, gameStarting) {
    for (let player of this.currentPlayers || this.running) {
      if (player.name == name) return false;
    }

    let player = new Player(socketid, name, this.getUserData(name).chips);
    this.currentPlayers.push(player);
    this.tryGameStart(gameStarting);

    log("info", "Poker System", `Ein Client ist dem System beigetreten (Name: ${name} | ID: ${socketid})`);

    return {"player": player};
  }

  // Verlassen des Systems
  leave(socketid) {
    const players = this.currentPlayers;

    for (let index in players) {
      if (players[index].id == socketid) {
        log("info", "Poker System", `Ein Client hat das System verlassen (Name: ${players[index].name} | ID: ${socketid})`);
        players.splice(index);
      }
    }
  }
}

module.exports = new Game();