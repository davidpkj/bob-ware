const Util = require("../../../helpers/util");

const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["clubs", "diamonds", "hearts", "spades"];

const generateAllCards = () => {
  let result = [];

  for (let suit of suits) {
    for (let number of numbers) {
      result.push(new Card(suit, number));
    }
  }

  return result;
}

class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  }
}

class Dealer {
  constructor(cards = generateAllCards(), table = []) {
    this.cards = cards;
    this.table = table;
  }
  
  deal() {
    let index = Util.randomNumber(0, this.cards.length - 1);
    let card = this.cards[index];

    this.cards.splice(index);

    return card;
  }

  dealToTable() {
    this.table.push(this.deal());
  }
}

/*
  Phasen des Spiels:
  preflop
  flop
  turn
  river
*/

module.exports = new Dealer();