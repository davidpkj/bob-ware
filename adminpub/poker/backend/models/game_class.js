class Game {
  constructor(players) {
    this.players = players;
  }

  running = false;

  start() {
    if (this.running == true && this.players >= 2) return;
     
    // Why does this go through? Prolly too fast?
    console.log("Das Spiel hat begonnen");
  }
}

module.exports = new Game();