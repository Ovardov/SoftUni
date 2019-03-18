function solve() {
    let string = document.getElementById('string').value;
    let character = document.getElementById('character').value;
    let resultElement = document.getElementById('result');

    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === character) {
            count++;
        }
    }

    function getResult(count) {
        return count % 2 === 0
            ? 'even'
            : 'odd';
    }

    resultElement.innerHTML = `Count of ${character} is ${getResult(count)}.`;
}