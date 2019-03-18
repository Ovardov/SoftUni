function solve() {
    let numberElement = document.querySelector('#exercise input[type="number"]');
    let buttons = document.querySelectorAll('#operations button');
    let outputElement = document.getElementById('output');
    let resultNumber;

    function getCurrentNumber() {
        resultNumber = +outputElement.textContent || +numberElement.value;
        return resultNumber;
    }

    function attachEvent() {
        let [chopButton, diceButton, spiceButton, bakeButton, filletButton] = buttons;

        chopButton.addEventListener('click', chop);
        diceButton.addEventListener('click', dice);
        spiceButton.addEventListener('click', spice);
        bakeButton.addEventListener('click', bake);
        filletButton.addEventListener('click', fillet);
    }

    attachEvent();

    function chop() {
        getCurrentNumber();
        resultNumber /= 2;
        outputElement.textContent = resultNumber;
    }

    function dice() {
        getCurrentNumber();
        resultNumber = Math.sqrt(resultNumber);
        outputElement.textContent = resultNumber;
    }

    function spice() {
        getCurrentNumber();
        resultNumber++;
        outputElement.textContent = resultNumber;
    }

    function bake() {
        getCurrentNumber();
        resultNumber *= 3;
        outputElement.textContent = resultNumber;
    }

    function fillet() {
        getCurrentNumber();
        resultNumber *= 0.8;
        outputElement.textContent = resultNumber;
    }
}
