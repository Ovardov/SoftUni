function solve() {
    let number = +document.getElementById('num1').value;
    let type = document.getElementById('type').value
        .toLowerCase();

    let resultElement = document.getElementById('result');
    let result = '';

    if (type === 'fahrenheit') {
        result = `${(number - 32) * 5 / 9}`;
    } else if (type === 'celsius') {
        result = `${number * 9 / 5 + 32}`;
    } else {
        result = 'Error!';
    }

    resultElement.innerHTML = (result === 'Error!') ? 'Error!' : Math.round(result);
}