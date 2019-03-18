function solve() {
    let buttons = Array.from(document.getElementsByTagName('button'));

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let clickedButton = event.target;
            let parent = clickedButton.parentNode;
            let inputElements = Array.from(parent.getElementsByTagName('input'));

            let hiddenDiv = Array.from(parent.querySelectorAll('div'))[1];

            if (inputElements[1].checked === true && clickedButton.textContent === 'Show more') {
                hiddenDiv.style.display = 'block';
                clickedButton.textContent = 'Hide it';
            } else if (inputElements[1].checked === true && clickedButton.textContent === 'Hide it') {
                hiddenDiv.style.display = 'none';
                clickedButton.textContent = 'Show more';
            }
        });
    });
}