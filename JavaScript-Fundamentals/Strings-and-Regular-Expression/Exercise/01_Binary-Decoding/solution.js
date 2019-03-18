function solve() {
    let text = document.getElementById('str').value;

    let removeCharacterCount = calculateRemoveCharacterCount(text);
    let cutText = text.substring(removeCharacterCount, text.length - removeCharacterCount);

    let groupsOfCharacter = cutText
        .split(/([\d]{8})/);

    let result = '';

    for (let currentGroupInBinary of groupsOfCharacter) {
        let currentGroupInDecimal = parseInt(currentGroupInBinary, 2);
        let currentLetter = String.fromCharCode(currentGroupInDecimal);

        if (currentLetter.match(/[A-Za-z\s]/)) {
            result += currentLetter;
        }
    }

    let resultElement = document.getElementById('result');
    resultElement.textContent = result;

    function calculateRemoveCharacterCount(text) {
        let result = text;

        while (result.length > 1) {
            let count = result
                .split('')
                .map(Number)
                .reduce((a, b) => a + b, 0)
                .toString();

            result = count;
        }

        return result;
    }
}