function solve() {
    let outputElement = document.getElementById('output');

    let extractButton = document.getElementsByTagName('button')[0];
    extractButton.addEventListener('click', extract);

    function extract() {
        let inputElement = document.getElementById('input').value;

        if (inputElement.match(/^[0-9]+/)) {
            let textNumber = inputElement
                .match(/^[0-9]+/)[0]
                .split('');

            let numbersLength = textNumber.length;
            let end = textNumber.join('');

            let inputText = inputElement.substr(numbersLength, end);

            let splitCharacter = inputText[inputText.length - 1];

            let [pattern, text] = inputText.split(splitCharacter);

            let regex = new RegExp(`[${pattern}]`);

            while ((valid = regex.exec(text)) !== null) {
                let findCharacter = valid[0];
                let index = text.indexOf(findCharacter);

                text = text.substring(0, index) + text.substring(index + 1);
            }

            while (text.includes('#')) {
                text = text.replace('#', ' ');
            }

            outputElement.value = text;
        }
    }
}