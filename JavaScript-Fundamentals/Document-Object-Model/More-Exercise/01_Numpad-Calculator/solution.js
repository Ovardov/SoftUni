function solve() {
    let buttons = Array.from(document.querySelectorAll('button'));
    let expressionOutputElement = document.getElementById('expressionOutput');
    let resultElement = document.getElementById('resultOutput');
    let clickCounter = 0;

    buttons.forEach(currentButton => {
        currentButton.addEventListener('click', (event) => {
            let clickedButton = event.target;
            clickCounter++;

            if (clickedButton.value === 'Clear') {
                clickCounter = 0;
                expressionOutputElement.textContent = '';
                resultElement.textContent = '';

            } else if (clickedButton.value === '=') {
                let [leftOperand, operator, rightOperand] = expressionOutputElement.textContent.split(' ');

                if (leftOperand !== undefined && operator !== undefined && rightOperand !== undefined) {
                    let result = 0;
                    leftOperand = +leftOperand;
                    rightOperand = +rightOperand;

                    switch (operator) {
                        case '+':
                            result = leftOperand + rightOperand;
                            break;
                        case '-':
                            result = leftOperand - rightOperand;
                            break;
                        case '*':
                            result = leftOperand * rightOperand;
                            break;
                        case '/':
                            result = leftOperand / rightOperand;
                            break;
                    }

                    resultElement.textContent = result;
                } else {
                    resultElement.textContent = NaN;
                }

            } else {
                if (clickedButton.value !== '*' && clickedButton.value !== '/' && clickedButton.value !== '+' && clickedButton.value !== '-') {
                    expressionOutputElement.textContent += `${clickedButton.value}`
                } else {
                    expressionOutputElement.textContent += ` ${clickedButton.value} `;
                }
            }
        });
    });
}