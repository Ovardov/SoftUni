function solve() {
    let textInput = document.getElementById('str1').value;
    let method = document.getElementById('str2').value;
    let resultElement = document.getElementById('result');

    let resultText = textInput
        .toLowerCase()
        .split(' ')
        .filter(x => x !== '')
        .map(e => e.charAt(0).toUpperCase() + e.slice(1))
        .join('');

    if (method !== 'Camel Case' && method !== 'Pascal Case') {
        resultText = 'Error!';
    } else if (method === 'Camel Case') {
        resultText = resultText.charAt(0).toLowerCase() + resultText.slice(1);
    }

    resultElement.textContent = resultText;
}