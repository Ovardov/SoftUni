function dart() {
    const maxScore = 100;

    const colorMapping = {
        'firstLayer': 0,
        'secondLayer': 1,
        'thirdLayer': 2,
        'fourthLayer': 3,
        'fifthLayer': 4,
        'sixthLayer': 5,
    };

    $('#playBoard').on('click', 'div', onPlayBoardClick);

    let isHome = true;

    function onPlayBoardClick(e) {
        e.stopPropagation();

        let currentScore = getScore(e.target.id);

        let selector = '';

        isHome
            ? selector = '#Home'
            : selector = '#Away';

        applyScoreAndCheckForWinner(currentScore, selector);

        switchTurns();

        isHome = !isHome;
    }

    function getScore(id) {
        let points = $('#scoreBoard tbody tr td:nth-child(2)')
            .eq(colorMapping[id])
            .text()
            .split(' ')[0];

        return +points;
    }


    function applyScoreAndCheckForWinner(points, selector) {
        let pointsElement;

        pointsElement = $(`${selector} p:first-child`);
        pointsElement.text((index, currentText) => Number(currentText) + points);

        let currentPoints = Number(pointsElement.text());
        if (currentPoints >= maxScore) {
            setColorAndRemoveEvents();
        }
    }

    function switchTurns() {
        if (isHome) {
            $('#turns p:first-child').text('Turn on Away');
            $('#turns p:last-child').text('Next is Home');
        } else {
            $('#turns p:first-child').text('Turn on Home');
            $('#turns p:last-child').text('Next is Away');
        }
    }

    function setColorAndRemoveEvents() {

        if (isHome) {
            $('#Home p:last-child').css('background', 'green');
            $('#Away p:last-child').css('background', 'red');
        } else {
            $('#Away p:last-child').css('background', 'green');
            $('#Home p:last-child').css('background', 'red');
        }

        $('#playBoard').off('click');
    }
}


