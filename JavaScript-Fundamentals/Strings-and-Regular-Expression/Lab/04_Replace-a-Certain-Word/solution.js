function solve() {
    let inputArray = JSON.parse(document.getElementById('arr').value);
    let replaceWord = document.getElementById('str').value;
    let resultElement = document.getElementById('result');
    let paragraphElement = document.createElement('p');

    let wordToBeReplaced = inputArray[0]
        .split(' ')
        .filter(x => x !== '')[2];

    let pattern = new RegExp(wordToBeReplaced, 'gi');

    for (let text of inputArray) {
        text = text.replace(pattern, replaceWord);

        let changedText = paragraphElement.cloneNode();
        changedText.textContent = text;
        resultElement.appendChild(changedText);
    }
}