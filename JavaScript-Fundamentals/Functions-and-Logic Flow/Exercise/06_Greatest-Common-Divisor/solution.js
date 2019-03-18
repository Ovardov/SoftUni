function greatestCD() {
    let firstNumber = document.getElementById('num1').value;
    let secondNumber = document.getElementById('num2').value;
    let resultElement = document.getElementById('result');

    while (firstNumber % secondNumber !== 0) {
        let gcd = firstNumber % secondNumber;
        if (gcd === 0) {
            break;
        }
        firstNumber = secondNumber;
        secondNumber = gcd;
    }

    resultElement.textContent = secondNumber;

}