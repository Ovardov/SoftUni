function solve() {
    let outputElement = document.getElementById('output');
    let resultText = '';

    let filterButton = document.getElementsByTagName('button')[0];
    filterButton.addEventListener('click', filter);

    let sortButton = document.getElementsByTagName('button')[1];
    sortButton.addEventListener('click', sort);

    let rotateButton = document.getElementsByTagName('button')[2];
    rotateButton.addEventListener('click', rotate);

    let getButton = document.getElementsByTagName('button')[3];
    getButton.addEventListener('click', get);

    function filter() {
        let inputText = document.getElementById('input').value.split('');
        let currentResultText = '';

        let filterOptions = document.getElementById('filterSecondaryCmd');
        let command = filterOptions.options[filterOptions.selectedIndex].value;

        if (command === 'uppercase') {
            currentResultText = inputText
                .filter(x => x.match(/[A-Z]/))
                .join('');
        } else if (command === 'lowercase') {
            currentResultText = inputText
                .filter(x => x.match(/[a-z]/))
                .join('');

        } else if (command === 'nums') {
            currentResultText = inputText
                .filter(x => x.match(/[0-9]/))
                .join('');
        }

        let inputPosition = document.getElementById('filterPosition').value;

        resultText += `${currentResultText[inputPosition - 1]}`;
        let pElement = outputElement.children[0];
        pElement.textContent = resultText;
    }

    function sort() {
        let inputText = document.getElementById('input').value.split('');
        let currentResultText = '';

        let sortOptions = document.getElementById('sortSecondaryCmd');
        let command = sortOptions.options[sortOptions.selectedIndex].value;

        if (command === 'A') {
            currentResultText = inputText
                .sort((a, b) => a.localeCompare(b))
                .join('');
        } else if (command === 'Z') {
            currentResultText = inputText
                .sort((a, b) => b.localeCompare(a))
                .join('');
        }

        let inputPosition = document.getElementById('sortPosition').value;

        resultText += `${currentResultText[inputPosition - 1]}`;
        let pElement = outputElement.children[0];
        pElement.textContent = resultText;
    }

    function rotate() {
        let inputText = document.getElementById('input').value.split('');

        let rotateNumber = document.getElementById('rotateSecondaryCmd').value;

        for (let i = 1; i <= rotateNumber; i++) {
            inputText.unshift(inputText.pop());
        }

        inputText = inputText.join('');

        let inputPosition = document.getElementById('rotatePosition').value;

        resultText += `${inputText[inputPosition - 1]}`;
        let pElement = outputElement.children[0];
        pElement.textContent = resultText;
    }

    function get() {
        let inputText = document.getElementById('input').value;

        let inputPosition = document.getElementById('getPosition').value;

        resultText += `${inputText[inputPosition - 1]}`;
        let pElement = outputElement.children[0];
        pElement.textContent = resultText;
    }

}