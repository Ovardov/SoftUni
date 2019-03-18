function getNext() {
    let number = +document.getElementById('num').value;

    let result = [];
    result.push(number);

    while (number !== 1) {
        if (number % 2 === 0) {
            number /= 2;
        } else if (number % 2 !== 0) {
            number = 3 * number + 1;
        }

        result.push(number);
    }

    let resultElement = document.getElementById('result');
    resultElement.textContent = `${result.join(' ')} `;
}