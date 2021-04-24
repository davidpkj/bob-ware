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

    let time = 30;

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

  // Startet ein Spiel KEINE RUNDE
  startGame(gameStarting) {
    log("info", "Poker System", "Eine Runde Poker beginnt");

    // TODO: IMPLEMENT ROUNDS
    this.startRound(gameStarting);
  }

  startRound(gameStarting) {
    const dealer = require("../models/dealer_class");
    const players = this.currentPlayers;
    const smallBlind = players.indexOf(Util.objectOfArrayWithProperty(players, "blind", "Small Blind"));
    
    // Erste Phase des Spiels
    const preflop = (startAt) => {
      for (let i = 0; i < 2; i++) {
        let startIndex = startAt;

        for (let k = 0; k < players.length; k++) {
          if (startIndex + k >= players.length) startIndex = 0 - k;
          
          let dealed = dealer.deal();
          Player.cards.push(dealed);
          gameStarting(players[startIndex+k].id, dealed);
        }
      }
    };

    // TODO: Blindsystem ausdenken
    this.setBlinds();
    // Rendert die Spielernamen und zeigt die ersten Blinds an
    gameStarting();

    // Gibt jedem Spieler die ersten 2 Karten, bei 2 Spielern bekommt BB die erste und nicht SB
    if (players.length > 2) {
      preflop(smallBlind);
    } else {
      if (smallBlind == 0) {
        preflop(1);
      } else {
        preflop(0);
      }
    }
  } 

  // Setzt die Blinds für die Spieler
  setBlinds() {
    const blinds = ["Dealer", "Small Blind", "Big Blind"];
    const players = this.currentPlayers;

    const loopBlinds = (startIndex) => {
      for (let i = 0; i < 3; i++) {
        if (i == 0 && players.length == 2) continue;
        if (startIndex + i == players.length) startIndex = 0 - i;

        players[startIndex + i].blind = blinds[i];
      }
    }

    if (Util.allObjectsOfArrayWithProperty(players, "blind", "").length == players.length) {
      let random = Util.randomNumber(0, players.length);

      loopBlinds(random);
    } else {
      let target = players.indexOf(Util.objectOfArrayWithProperty(players, "blind", "Small Blind"));

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

  getMessageSender(socketid) {
    for (let player of this.currentPlayers) {
      if (socketid == player.id) return player.name;
    }
  }

  // Tritt dem System bei außer Spiel Läuft
  async join(name, socketid, gameStarting) {
    for (let player of this.currentPlayers || this.running) {
      if (player.name == name) return false;
    }

    let player = new Player(socketid, name, this.getUserData(name).chips);
    this.currentPlayers.push(player);
    this.tryGameStart(gameStarting);

    log("info", "Poker System", `Ein Client ist dem System beigetreten (Name: ${name})`);

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