class Card {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }

  // TODO: Eine Karte muss immer als ZUFÄLLIG und NEU instanziert werden (merge constructor + getCard)
  /*
  constructor(color, number, location) {
    this.color = color;
    this.number = number;
    this.location = location;
  }

  static getCard() {  // Gib eine noch nich ausgeteilte Card zurück
    let rückgabe = [];
    let card = this.rndInt(52, 1);

    while (this.dealt.includes(card)) {
      card = this.rndInt(52, 1);
    }

    this.dealt.push(card);

    rückgabe[0] = 0;
    while (card > 13) {
      card -= 13;
      if (card > 0) rückgabe[0]++;
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

    return new Card(rückgabe[0], rückgabe[1]);
  } */
}
