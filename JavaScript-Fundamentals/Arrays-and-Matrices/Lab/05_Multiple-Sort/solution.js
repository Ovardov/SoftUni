function solve() {
    let inputArray = JSON.parse(document.getElementById('arr').value);

    let sortedByAscendingOrder = inputArray
        .map(Number)
        .sort((a, b) => a - b);

    let sortedAlphabetically = inputArray
        .sort((a, b) => a.localeCompare(b));

    let resultElement = document.getElementById('result');
    let firstDivElement = document.createElement('div');
    let secondDivElement = document.createElement('div');

    firstDivElement.textContent = sortedByAscendingOrder.join(', ');
    secondDivElement.textContent = sortedAlphabetically.join(', ');

    resultElement.appendChild(firstDivElement);
    resultElement.appendChild(secondDivElement)
}