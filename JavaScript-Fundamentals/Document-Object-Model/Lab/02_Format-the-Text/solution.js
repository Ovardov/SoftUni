function solve() {
    let inputElement = document.getElementById('input');
    let inputText = inputElement.textContent;
    let sentencesArray = inputText.split('.');
    let outputElement = document.getElementById('output');
    if (sentencesArray[sentencesArray.length - 1] === '') {
        sentencesArray.pop();
    }

    for (let i = 0; i < sentencesArray.length; i += 3) {
        let paragraph = document.createElement('p');
        paragraph.textContent = `${sentencesArray[i]}. `;

        if (sentencesArray.length > i + 1) {
            paragraph.textContent += `${sentencesArray[i + 1]}. `
        }

        if (sentencesArray.length > i + 2) {
            paragraph.textContent += `${sentencesArray[i + 2]}.`
        }

        outputElement.appendChild(paragraph);
    }
}