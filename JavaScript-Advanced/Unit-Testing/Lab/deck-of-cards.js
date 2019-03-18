function printDeckOfCards(cards) {

    function makeCard(face, suit) {
        const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = {
            'S': '\u2660',
            'H': '\u2665',
            'D': '\u2666',
            'C': '\u2663'
        };

        if (!faces.includes(face) || !suits.hasOwnProperty(suit)) {
            let error = new Error('Invalid card!');

            error.card = `${face}${suit}`;

            throw error;
        }

        let card = {
            face: face,
            suit: suits[suit],
            toString: function () {
                return `${this.face}${this.suit}`;
            }
        };

        return card
    }

    try {
        let allCards = cards.map(x => {
            x = x.split('');
            let suit = x.pop();
            let face = x.join('');

            return makeCard(face, suit);
        });

        console.log(allCards.join(' ')); // join call toString(), and then join array

    } catch (error) {
        console.log(`Invalid card: ${error.card}`);
    }
}

printDeckOfCards(['5S', '3D', 'QD', '1C']);