function solve() {
    let searchNumber = parseInt(document.getElementById('num').value);
    let inputArray = JSON.parse(document.getElementById('arr').value);
    let resultElement = document.getElementById('result');

    let allIndexes = [];

    for (let currentElement of inputArray) {
        let findIndex = currentElement.indexOf(searchNumber);

        findIndex !== -1
            ? allIndexes.push(`true -> ${findIndex}`)
            : allIndexes.push(`false -> ${findIndex}`);
    }

    resultElement.textContent = allIndexes.join(',');
}