function solve() {
    let string = document.getElementById('string').value;
    let resultElement = document.getElementById('result');

    let uniqueElements = [];
    let regex = /\s+/g;

    string
        .split('')
        .forEach(x => {
            if (x.match(regex) || !uniqueElements.includes(x)) {
                uniqueElements.push(x);
            }
        });

    resultElement.innerHTML = `${uniqueElements.join('')}`;
}