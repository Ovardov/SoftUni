function solve() {
    let selectMenuTo = document.getElementById('selectMenuTo');
    let inputElement = document.getElementById('input');
    let resultElement = document.getElementById('result');
    let convertButton = document.querySelector('button');

    let firstOptionElement = selectMenuTo.children[0];
    firstOptionElement.value = 'binary';
    firstOptionElement.textContent = 'Binary';

    let secondOptionElement = document.createElement('option');
    secondOptionElement.value = 'hexadecimal';
    secondOptionElement.textContent = 'Hexadecimal';

    selectMenuTo.appendChild(secondOptionElement);

    convertButton.addEventListener('click', (event) => {
        let inputNumber = +inputElement.value;
        let selectedOptionValue = selectMenuTo.options[selectMenuTo.selectedIndex].value;

        if (selectedOptionValue === 'binary') {
            let binaryNumber = inputNumber.toString(2);
            resultElement.value = binaryNumber;
        } else if (selectedOptionValue === 'hexadecimal') {
            let hexadecimalNumber = inputNumber.toString(16);

            if (hexadecimalNumber.match(/[a-z]+/g)) {
                hexadecimalNumber = hexadecimalNumber.toUpperCase();
            }

            resultElement.value = hexadecimalNumber;
        }
    });
}
