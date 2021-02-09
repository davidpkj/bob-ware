const log = require("../../../helpers/log_handler");
const Player = require("../models/player_class");
const Util = require("../../../helpers/util");
const fs = require("fs");

class Game {
  running = false;
  tableCards = [];
  currentPlayers = [];

  // Versucht eine Runde zu Starten
  startRound() {
    if (this.running == true || this.currentPlayers.length > 8 || this.currentPlayers.length < 2) {
      log(`warn`, `Poker System`, `Poker kann nicht starten (running: ${this.running}, players: ${this.currentPlayers.length})`);
      return;
    }

    // TODO: IMPLEMENT ROUNDS
    log("info", "Poker System", "Eine Runde Poker beginnt");
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

  // Tritt dem System bei
  join(name, socketid) {
    for (let player of this.currentPlayers) {
      if (player.name == name) return {};
    }

    let player = new Player(socketid, name, this.getUserData(name).chips);

    this.currentPlayers.push(player);

    log("info", "Poker System", `Ein Client ist dem System beigetreten (Name: ${name})`);

    return player;
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

  // Ändern des Bereitheitszustandes, gibt bei mind. 1 ready playern true aus
  toggleReadyState(socketid) {
    for (let player of this.currentPlayers) {
      if (player.id == socketid) player.readyState = !player.readyState;
    }

    if (Util.objectOfArrayWithProperty(this.currentPlayers, "readyState", true)) return true;

    return false;
  }

  // Gibt den relevante Daten über den Zustand des Spiels als Objekt zurück
  getState() {
    return {
      running: this.running,
      readyCount: Util.allObjectsOfArrayWithProperty(this.currentPlayers, "readyState", true).length,
      playerCount: this.currentPlayers.length
    };
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