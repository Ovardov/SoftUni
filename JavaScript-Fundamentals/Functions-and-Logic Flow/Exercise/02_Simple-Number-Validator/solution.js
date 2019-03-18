function validate() {
    let weightArray = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    let sum = 0;

    document.querySelector('#exercise > fieldset > div > button')
        .addEventListener('click', validateNumber);

    function validateNumber() {
        let inputNumber = document.querySelector('#exercise > fieldset > div > input').value;

        let lastDigit = +inputNumber[inputNumber.length - 1];

        for (let i = 0; i < inputNumber.length - 1; i++) {
            let currentInputNumber = +inputNumber[i];
            let currentWeightNumber = +weightArray[i];

            sum += currentInputNumber * currentWeightNumber;
        }

        let remainder = sum % 11;
        if (remainder === 10) {
            remainder = 0;
        }

        let responseElement = document.getElementById('response');

        if (remainder === lastDigit) {
            responseElement.textContent = 'This number is Valid!';
        } else {
            responseElement.textContent = 'This number is NOT Valid!';
        }
    }
}