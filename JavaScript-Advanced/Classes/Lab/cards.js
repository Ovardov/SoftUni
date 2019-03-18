let result = (function () {

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }

        get suit() {
            return this._suit;
        }

        set face(face) {
            let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

            if (faces.includes(face)) {
                this._face = face;
            } else {
                throw new Error('Invalid face!');
            }
        }

        set suit(suit) {
            if (suit === '\u2660' || suit === '\u2665' || suit === '\u2666' || suit === '\u2663') {
                this._suit = suit;
            } else {
                throw new Error('Invalid suit!');
            }
        }
    }

    // Capitalize => the condition of the task requires it
    let Suits = {
        'SPADES': '\u2660', // ♠
        'HEARTS': '\u2665', // ♥
        'DIAMONDS': '\u2666', // ♦
        'CLUBS': '\u2663', // ♣
    };

    return {
        Suits: Suits,
        Card: Card
    }
}());


let Suits = result.Suits;
let Card = result.Card;

let card = new Card("3", Suits.CLUBS);
console.log(card.suit);
