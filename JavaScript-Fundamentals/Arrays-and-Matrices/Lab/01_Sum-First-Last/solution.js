function solve() {
    let inputText = document.getElementById('arr').value;
    let inputArray = JSON.parse(inputText);
    let resultElement = document.getElementById('result');

    for (let i = 0; i < inputArray.length; i++) {
        let result = Number(inputArray[i]) * inputArray.length;

        let pElement = document.createElement('p');
        pElement.textContent = `${i} -> ${result}`;

        resultElement.appendChild(pElement)
    }
}