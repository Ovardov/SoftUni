function solve() {
    let inputString = document.getElementById('str').value;
    let numberForSplit = document.getElementById('num').value;
    let resultElement = document.getElementById('result');

    let pattern = new RegExp('.{1,' + numberForSplit + '}', 'g');
    let result = '';

    if (inputString.length >= numberForSplit) {
        result = inputString
            .match(pattern);

        let lastElement = result[result.length - 1];

        if (lastElement.length < numberForSplit) {
            result.pop();

            let difference = numberForSplit - lastElement.length;
            let newWord = lastElement.concat(inputString.substr(0, difference));

            result.push(newWord)
        }

        result = result.join(' ');
    } else {
        let differenceBetweenLength = numberForSplit - inputString.length;
        result = `${inputString}${inputString.substr(0, differenceBetweenLength)}`;
    }

    resultElement.textContent = result;
}