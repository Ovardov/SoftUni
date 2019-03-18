function solve() {
    let allCards = Array.from(document.querySelectorAll('#exercise img'));

    allCards.forEach(img => {
        img.addEventListener('click', clickEvent);
    });

    function clickEvent(event) {
        let card = event.target;
        let parent = card.parentNode;
        let spans = document.getElementById('result').children;
        let historyElement = document.getElementById('history');

        card.removeEventListener('click', clickEvent);
        card.src = './images/whiteCard.jpg';

        let leftSpan = spans[0];
        let rightSpan = spans[2];

        if (parent.id === 'player1Div') {
            spans[0].textContent = card.name;
        } else if (parent.id === 'player2Div') {

            spans[2].textContent = card.name;
        }

        if (spans[0].textContent && spans[2].textContent) {
            let winner;
            let looser;

            if (+leftSpan.textContent > +rightSpan.textContent) {
                winner = document.querySelector(`#player1Div img[name='${leftSpan.textContent}']`);
                looser = document.querySelector(`#player2Div img[name='${rightSpan.textContent}']`);

            } else {
                looser = document.querySelector(`#player1Div img[name='${leftSpan.textContent}']`);
                winner = document.querySelector(`#player2Div img[name='${rightSpan.textContent}']`);
            }

            winner.style.border = '2px solid green';
            looser.style.border = '2px solid darkred';

            historyElement.textContent += `[${leftSpan.textContent} vs ${rightSpan.textContent}] `;

            leftSpan.textContent = '';
            rightSpan.textContent = '';
        }
    }
}