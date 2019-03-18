function solve() {
    let inputText = document.getElementById('str').value;
    let resultElement = document.getElementById('result');

    let inputNumbers = [];
    let inputTextAsArray = inputText
        .split(' ')
        .filter(x => x !== '');

    for (let token of inputTextAsArray) {
        if (isNaN(token)) {
            let result = token
                .split('')
                .map(letter => letter.charCodeAt(0))
                .join(' ');

            let pElement = document.createElement('p');
            pElement.textContent = result;
            resultElement.appendChild(pElement);
        } else {
            inputNumbers.push(token);
        }
    }

    let wordFromNumbers = String.fromCharCode(...inputNumbers);

    let pElement = document.createElement('p');
    pElement.textContent = wordFromNumbers;
    resultElement.appendChild(pElement);
}