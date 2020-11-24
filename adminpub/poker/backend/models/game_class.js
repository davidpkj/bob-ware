class Game {
  constructor(players) {
    this.players = players;
    /*  TODO:
        evtl. Array mit allen Spielern, wenn nicht dann:
            muss eins erstellt werden
        + alle this.players kontrollieren
    */
    }

  running = false;

  start() {
    if (this.running == true && this.players >= 2) return;
     
    // Why does this go through? Prolly too fast?
    console.log("Das Spiel hat begonnen");
  }


  static dealt = []; // Ausgeteilte Karten

  static rndInt (max, min) {
      return Math.floor(Math.random() * max) + min;
  }

  static getCard () {  // Gib eine noch nich ausgeteilte Card zurück
    let rückgabe = [];     
    let card = this.rndInt(52, 1);

    while (this.dealt.includes(card)) {
        card = this.rndInt( 52, 1);
    }

    this.dealt.push(card);
    
    rückgabe[0] = 0;
    while (card > 13) {
        card -= 13;
        if ( card > 0) rückgabe[0] ++;
    }
    switch (rückgabe[0]) {
        case 0:
            rückgabe[0] = "Kreutz";
            break;
        case 1:
            rückgabe[0] = "Pik";
            break;
        case 2:
            rückgabe[0] = "Herz";
            break;
        case 3:
            rückgabe[0] = "Karo";
            break;
        default:
            break;
    }

    rückgabe[1] = card + 1;

    return new Card( rückgabe[0], rückgabe[1]);
  }

  /* Phasen des Spiels:
  prefloop
  flop
  turn
  river
  */
  static preflop () { // Gibt jedem Spieler zwei Karten
      for (let j of this.players) {
          j.cards.push(this.getCard());
          j.cards.push(this.getCard());
      }
  }
  
  static cardOnTable () { // Legt eine Karte auf den Tisch
      let tableCard = this.getCard();

      for (let j of player.this) {
          j.cards.push(tableCard);
      }
  }

  static flop () {    // Phase des Spiels
      for (let i = 0; i < 3; i++) {
          this.cardOnTable();
      }
  }

  static turn () {    // Phase des Spiels
      this.cardOnTable();
  }

  static river () {   // Phase des Spiels
      this.cardOnTable();
  }
}

module.exports = new Game();