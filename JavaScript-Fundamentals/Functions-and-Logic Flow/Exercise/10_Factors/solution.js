function solve() {
    let number = +document.getElementById('num').value;

    let result = [];

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            result.push(i);
        }
    }

    let resultElement = document.getElementById('result');
    resultElement.textContent = result.join(' ');
}