function solve() {
    let exerciseElement = document.getElementById('exercise');
    let buttons = Array.from(document.getElementsByTagName('button'));
    let resultElement = document.getElementById('result');

    let allRightAnswers = ['2013', 'Pesho', 'Nakov'];
    let hiddenSectionCounter = 0;
    let rightAnswers = 0;

    buttons.forEach(currentButton => {
        currentButton.addEventListener('click', event => {

            let parent = currentButton.parentNode;
            let inputElements = Array.from(parent.getElementsByTagName('input'));

            inputElements.forEach(currentInput => {
                if (currentInput.checked === true) {
                    hiddenSectionCounter++;
                    let answer = currentInput.value;

                    if (allRightAnswers.includes(answer)) {
                        rightAnswers++;
                    }

                    // all questions displayed
                    if (currentButton.textContent === 'Get the results') {

                        if (rightAnswers === 3) {
                            resultElement.textContent = `You are recognized as top SoftUni fan!`;
                        } else {
                            resultElement.textContent = `You have ${rightAnswers} right answers`;
                        }

                    } else {
                        exerciseElement.children[hiddenSectionCounter].style.display = 'block';
                    }
                }
            });
        });
    });
}