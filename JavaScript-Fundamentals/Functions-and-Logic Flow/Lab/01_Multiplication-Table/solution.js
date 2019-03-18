function solve() {
    let firstNumber = +document.getElementById('num1').value;
    let secondNumber = +document.getElementById('num2').value;

    let resultElement = document.getElementById('result');

    if (firstNumber > secondNumber) {
        resultElement.innerHTML = 'Try with other numbers.';
    } else {
        for (let i = firstNumber; i <= secondNumber; i++) {
            let pElement = document.createElement('p');
            pElement.textContent = `${i} * ${secondNumber} = ${i * secondNumber}`;
            resultElement.appendChild(pElement);
        }
    }
}