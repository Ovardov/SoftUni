function decodeText(arr) {

    let pattern = /32656 19759 32763 0 [0-9]+ 0 (.+?)\s0/g;

    let allText = '';
    for (let token of arr) {
        allText += token + ' ';
    }

    while ((valid = pattern.exec(allText)) !== null) {
        let currentNumbers = valid[1]
            .split(' ')
            .filter(x => x !== '');

        let result = currentNumbers
            .map(x => String.fromCharCode(x))
            .join('');

        console.log(result);
    }
}

decodeText(['32656 19759 32763 0 5 0 80 101 115 104 111 0 0 0 0 0 0 0 0 0 0 0',
    '0 32656 19759 32763 0 7 0 83 111 102 116 117 110 105 0 0 0 0 0 0 ']);