function solve() {
    let inputText = document.getElementById('arr').value;
    let inputArray = JSON.parse(inputText);

    inputArray
        .forEach((currentWord, index, array) => {
            array[index] = currentWord
                .split('')
                .reverse()
                .join('');

        });

    let resultArray = inputArray
        .map(currentWord => currentWord[0].toUpperCase() + currentWord.slice(1));

    let resultElement = document.getElementById('result');
    resultElement.textContent = resultArray.join(' ');
}