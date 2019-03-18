function solve() {
    let firstNumber = +document.getElementById('firstNumber').value;
    let secondNumber = +document.getElementById('secondNumber').value;
    let firstString = document.getElementById('firstString').value;
    let secondString = document.getElementById('secondString').value;
    let thirdString = document.getElementById('thirdString').value;
    let resultElement = document.getElementById('result');

    for (let i = firstNumber; i <= secondNumber; i++) {
        let pElement = document.createElement('p');

        if (i % 3 === 0 && i % 5 === 0) {
            pElement.textContent = `${i} ${firstString}-${secondString}-${thirdString}`;
        } else if (i % 3 === 0) {
            pElement.textContent = `${i} ${secondString}`;
        } else if (i % 5 === 0) {
            pElement.textContent = `${i} ${thirdString}`;
        } else {
            pElement.textContent = i;
        }

        resultElement.appendChild(pElement);
    }
}