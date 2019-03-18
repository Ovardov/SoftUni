function solve() {
    let inputElement = document.querySelector('input');
    let button = document.querySelector('button');
    let allNumbersElement = document.querySelector('#allNumbers');

    button.addEventListener('click', event => {
        let inputText = inputElement.value.split(' ');

        inputText = inputText
            .map(Number)
            .filter(x => x >= 1 && x <= 49);

        if (inputText.length === 6) {

            for (let i = 1; i <= 49; i++) {
                let newDivElements = document.createElement('div');
                newDivElements.className = 'numbers';
                newDivElements.textContent = i;
                allNumbersElement.appendChild(newDivElements);
            }

            let allNumbersDiv = Array.from(allNumbersElement.children);

            allNumbersDiv.forEach(currentDiv => {
                let currentTextContent = +currentDiv.textContent;
                if (inputText.includes(currentTextContent)) {
                    currentDiv.style.background = 'orange'
                }
            });

            inputElement.disabled = true;
            button.disabled = true;
        }
    });
}