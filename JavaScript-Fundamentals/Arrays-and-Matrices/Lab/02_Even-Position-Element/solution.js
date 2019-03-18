function solve() {
    let inputArray = JSON.parse(document.getElementById('arr').value);

    let evenNumbers = [];
    let resultElement = document.getElementById('result');

    for (let i = 0; i < inputArray.length; i += 2) {
        evenNumbers.push(inputArray[i]);
    }

    resultElement.textContent = `${evenNumbers.join(' x ')}`;
}