function solve() {
    let keyword = document.getElementById('str').value;
    let text = document.getElementById('text').value;
    let resultElement = document.getElementById('result');

    let pattern = /(east|north).*?([0-9]{2})[^,]*?,[^,]*?([0-9]{6})/gi;

    let message = text.slice(text.indexOf(keyword) + keyword.length, text.lastIndexOf(keyword));

    let north = '';
    let east = '';

    while ((valid = pattern.exec(text)) !== null) {
        let northOrEast = valid[1];

        if (northOrEast.toLowerCase() === 'north') {
            north = `${valid[2]}.${valid[3]} N`
        } else if (northOrEast.toLowerCase() === 'east') {
            east = `${valid[2]}.${valid[3]} E`;
        }
    }

    appendToParent(north);
    appendToParent(east);
    appendToParent(`Message: ${message}`);

    function appendToParent(result) {
        let pElement = document.createElement('p');
        pElement.textContent = result;

        resultElement.appendChild(pElement);
    }
}