function solve() {
    let inputArr = JSON.parse(document.getElementById('arr').value);
    let resultElement = document.getElementById('result');
    let paragraphElement = document.createElement('p');

    let invalidDataParagraph = paragraphElement.cloneNode();
    invalidDataParagraph.textContent = 'Invalid data';

    let dashParagraph = paragraphElement.cloneNode();
    dashParagraph.textContent = '- - -';

    let pattern = /^([A-Z][a-z]* [A-Z][a-z]*) (\+359 \d \d{3} \d{3}|\+359-\d-\d{3}-\d{3}) ([a-z0-9]+@[a-z]+\.[a-z]{2,3})$/g;
    inputArr.forEach(element => {
        let match = pattern.exec(element);

        if (match) {
            insertValidElement(`Name: ${match[1]}`);
            insertValidElement(`Phone Number: ${match[2]}`);
            insertValidElement(`Email: ${match[3]}`);
        } else {
            resultElement.appendChild(invalidDataParagraph.cloneNode(true));
        }

        resultElement.appendChild(dashParagraph.cloneNode(true));
    });

    function insertValidElement(text) {
        let validUserElement = paragraphElement.cloneNode();
        validUserElement.textContent = text;
        resultElement.appendChild(validUserElement);
    }
}


