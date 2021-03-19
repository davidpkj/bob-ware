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
  async tryRoundStart(roundStarting) {
    if (this.running == true || this.currentPlayers.length > 8 || this.currentPlayers.length < 2 || interval != null) {
      log(`warn`, `Poker System`, `Poker kann nicht starten (running: ${this.running}, players: ${this.currentPlayers.length}, counting: ${interval ? true : false})`);
      return false;
    }

    let time = 5;

    interval = setInterval(() => {
      if (this.currentPlayers.length < 2 || time == 0) {
        clearInterval(interval);
        interval = null;

        if (time == 0) {
          this.running = true;
          this.startRound(roundStarting);
          return true;
        }

        return false;
      }

      time--;
    }, 1000);
  }

  // Startet ein Spiel KEINE RUNDE // TODO: Rename
  startRound(roundStarting) {
    const dealer = require("../models/dealer_class");
    this.setBlinds();

    // TODO: IMPLEMENT ROUNDS
    log("info", "Poker System", "Eine Runde Poker beginnt");
    roundStarting();
  }

  // Setzt die Blinds für die Spieler // TODO: Simpify
  setBlinds() {
    const blinds = ["Dealer", "Small Blind", "Big Blind"];
    const players = this.currentPlayers;

    if (Util.allObjectsOfArrayWithProperty(players, "blind", "").length == players.length) {
      let random = Util.randomNumber(0, players.length);

      for (let i = 0; i < 3; i++) {
        // Bei zwei spielern den Dealer weglassen
        if (i == 3 && players == 2) break;
        // Wenn drüber
        if (random + i == players.length) random = 0 - i;

        players[random + i].blind = blinds[i];
      }
    } else {
      let target = players.indexOf(Util.objectOfArrayWithProperty(players, "blind", "Big Blind"));

      for (let player of players) {
        player.blind = "";
      }
    
      for (let i = 2; i >= 0; i--) {
        // Bei zwei Spielern den Dealer weglassen
        if (i == 0 && players.length == 2) break;
        // Wenn drüber
        if (target - 1 + i >= players.length) target = 1 - i;
        // Wenn drunter
        if (target - 1 + i < 0) target = players.length - i;

        players[target - 1 + i].blind = blinds[i];
      }
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
  async join(name, socketid, roundStarting) {
    for (let player of this.currentPlayers || this.running) {
      if (player.name == name) return false;
    }

    let player = new Player(socketid, name, this.getUserData(name).chips);
    this.currentPlayers.push(player);
    this.tryRoundStart(roundStarting);

    log("info", "Poker System", `Ein Client ist dem System beigetreten (Name: ${name})`);

    return {"player": player};
  }

  // Verlassen des Systems
  leave(socketid) {
    for (let index in this.currentPlayers) {
      if (this.currentPlayers[index].id == socketid) {
        log("info", "Poker System", `Ein Client hat das System verlassen (Name: ${this.currentPlayers[index].name} | ID: ${socketid})`);
        this.currentPlayers.splice(index);
      }
    }
  }

  preflop() {
    for (let player of this.currentPlayers) {
      Cards
    }
  }

  /*
  static dealt = []; // Ausgeteilte Karten

  Phasen des Spiels:
  prefloop
  flop
  turn
  river
  
  static preflop() { // Gibt jedem Spieler zwei Karten
    for (let j of this.players) {
      j.cards.push(this.getCard());
      j.cards.push(this.getCard());
    }
  }

  static cardOnTable() { // Legt eine Karte auf den Tisch
    let tableCard = this.getCard();

    for (let j of player.this) {
      j.cards.push(tableCard);
    }
  }

  static flop() {    // Phase des Spiels
    for (let i = 0; i < 3; i++) {
      this.cardOnTable();
    }
  }

  static turn() {    // Phase des Spiels
    this.cardOnTable();
  }

  static river() {   // Phase des Spiels
    this.cardOnTable();
  }
  */
}

module.exports = new Game();