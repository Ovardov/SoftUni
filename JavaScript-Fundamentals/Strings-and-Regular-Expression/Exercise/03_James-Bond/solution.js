function solve() {
    let inputArray = JSON.parse(document.getElementById('arr').value);
    let resultElement = document.getElementById('result');

    let specialKey = inputArray.shift();
    if (specialKey.match(/[A-Za-z]+/g)) {
        let keyAndMessagePattern = new RegExp(`(?<=\\s|^)${specialKey}\\s+([A-Z!#$%]{8,})(?=\\s|\\,|\\.|$)`, 'gi');
        let messagePattern = /^[A-Z!#$%]{8,}$/g;

        for (let currentText of inputArray) {
            while ((valid = keyAndMessagePattern.exec(currentText)) !== null) {
                let findMessage = valid[1];

                if (findMessage.match(messagePattern)) {
                    let newMessage = decodeMessage(findMessage);

                    currentText = currentText.replace(findMessage, newMessage);
                }
            }

            appendToParent(currentText);
        }
    }

    function decodeMessage(message) {
        let newMessage = '';
        for (let currentSymbol of message) {

            if (currentSymbol === '!') {
                newMessage += 1;
            } else if (currentSymbol === '%') {
                newMessage += 2;
            } else if (currentSymbol === '#') {
                newMessage += 3
            } else if (currentSymbol === '$') {
                newMessage += 4;
            } else if (currentSymbol.toUpperCase() === currentSymbol) {
                newMessage += currentSymbol.toLowerCase();
            }
        }

        return newMessage;
    }

    function appendToParent(result) {
        let pElement = document.createElement('p');
        pElement.textContent = result;
        resultElement.appendChild(pElement);
    }
}