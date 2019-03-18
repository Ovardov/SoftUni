function solve() {
    let allCards = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    };

    let selectElement = document.querySelector('#exercise select');
    let resultElement = document.getElementById('cards');
    document.querySelector('#exercise button')
        .addEventListener('click', getMyCards);

    function getMyCards() {
        let fromElement = document.getElementById('from');
        let from = fromElement.value;
        let toElement = document.getElementById('to');
        let to = toElement.value;
        let suit = selectElement.options[selectElement.selectedIndex].value;
        suit = suit[suit.length - 1];

        for (let i = allCards[from]; i <= allCards[to]; i++) {
            let currentCard = Object.keys(allCards)
                .find(key => allCards[key] === i);

            let cardContainer = document.createElement('div');
            cardContainer.className = 'card';

            let firstParagraph = document.createElement('p');
            firstParagraph.innerHTML = suit;

            let secondParagraph = document.createElement('p');
            secondParagraph.innerHTML = currentCard;

            let thirdParagraph = document.createElement('p');
            thirdParagraph.innerHTML = suit;

            cardContainer.appendChild(firstParagraph);
            cardContainer.appendChild(secondParagraph);
            cardContainer.appendChild(thirdParagraph);
            resultElement.appendChild(cardContainer);

            fromElement.value = '';
            toElement.value = ''
        }
    }
}