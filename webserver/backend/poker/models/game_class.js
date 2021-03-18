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
  async tryRoundStart(sendSocketRoundStartCallback) {
    if (this.running == true || this.currentPlayers.length > 8 || this.currentPlayers.length < 2 || interval != null) {
      log(`warn`, `Poker System`, `Poker kann nicht starten (running: ${this.running}, players: ${this.currentPlayers.length}, counting: ${interval ? true : false})`);
      return false;
    }

    let time = 30;

    interval = setInterval(() => {
      if (this.currentPlayers.length < 2 || time == 0) {
        clearInterval(interval);
        interval = null;

        if (time == 0) {
          
          sendSocketRoundStartCallback();
          this.running = true;
          return true;
        }
      }

      time--;
    }, 1000);
  }

  // Startet eine Runde
  startRound() {
    const dealer = require("../models/dealer_class");

    // TODO: IMPLEMENT ROUNDS
    log("info", "Poker System", "Eine Runde Poker beginnt");
  }

  // Gibt Array mit 3 aufeinander Folgenden Spielern für Blinds aus
  setBlinds(indizes) {
    let res = []; 
    let index = indizes ?? Util.randomNumber(0, this.currentPlayers.length);
    for (let i = 0; i < 3; i++) {
      if ( index - i < 0 ) index = this.currentPlayers.length + i - 1;
      res.push(this.currentPlayers[index - i].name);
    }
    // Wenn nurnoch 2 Spieler haben die Blinds vor dem Dealer Priorität
    if (res[0] == res[2]) res.splice(2); 

    return { "res": res, "index": index};
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
  async join(name, socketid, sendSocketRoundStartCallback) {
    for (let player of this.currentPlayers || this.running) {
      if (player.name == name) return false;
    }

    let player = new Player(socketid, name, this.getUserData(name).chips);
    this.currentPlayers.push(player);
    let roundStartResult = await this.tryRoundStart(sendSocketRoundStartCallback);

    log("info", "Poker System", `Ein Client ist dem System beigetreten (Name: ${name})`);

    return {"player": player, "roundStarting": roundStartResult};
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