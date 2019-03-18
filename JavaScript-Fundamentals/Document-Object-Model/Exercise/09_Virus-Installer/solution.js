function solve() {
    let buttonsElement = document.getElementById('buttons');
    let buttons = Array.from(document.getElementById('buttons').children);
    let img = document.getElementById('softUni-person-img');

    let nextCounter = 0;
    let allContentElements = document.getElementById('content');
    let allDivsInContent = allContentElements.children;

    let allDivsId = ['firstStep', 'secondStep', 'thirdStep'];

    buttons.forEach(currentButton => {
        currentButton.addEventListener('click', event => {

            let clickedButton = event.target;

            if (clickedButton.textContent === 'Next') {
                nextCounter++;

                document.getElementById('content').style.backgroundImage = 'none';
                if (nextCounter > 1) {
                    allDivsInContent[nextCounter - 2].style.display = 'none';
                }

                let idForResult = allDivsId[nextCounter - 1];

                if (idForResult === 'firstStep') {
                    buttons[0].disabled = true;
                    let inputElements = document.querySelectorAll('input');

                    inputElements.forEach(currentInput => {
                        currentInput.addEventListener('click', event => {
                            let clickedRadio = event.target;

                            if (clickedRadio.value === 'agree') {
                                buttons[0].disabled = false;
                            }
                        });
                    })
                }

                document.getElementById(idForResult).style.display = 'block';

                if (document.getElementById('thirdStep').style.display === 'block') {
                    let finishButton = document.createElement('button');
                    finishButton.textContent = 'Finish';
                    buttonsElement.removeChild(buttons[0]);
                    buttonsElement.removeChild(buttons[1]);
                    buttonsElement.appendChild(finishButton);
                    buttons = Array.from(buttonsElement.children);
                }

                if (buttons[0].textContent === 'Finish') {
                    buttons[0].addEventListener('click', event => {
                        document.querySelector('section').style.display = 'none';
                        img.style.cssFloat = 'right'
                    })
                }
            } else {
                document.querySelector('section').style.display = 'none';
                img.style.cssFloat = 'right'
            }
        })
    });
}