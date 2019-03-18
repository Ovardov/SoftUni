function binarySearch() {
    let inputText = document.querySelector('#arr').value;
    let inputArray = inputText.split(', ');

    let numberThatSearch = document.getElementById('num').value;
    let resultElement = document.getElementById('result');

    let index = inputArray.indexOf(numberThatSearch);
    if (index !== -1) {
        resultElement.textContent = `Found ${numberThatSearch} at index ${index}`;
    } else {
        resultElement.textContent = `${numberThatSearch} is not in the array`;
    }
}