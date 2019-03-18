function findNumbers(text) {
    let regex = /[0-9]+/g;
    let numbers = [];

    while ((valid = regex.exec(text)) !== null) {
        numbers.push(valid[0]);
    }

    for (let currentNumber of numbers) {
        if (currentNumber[currentNumber.length - 1] == 1) {
            console.log(`${currentNumber}st`);
        } else if (currentNumber[currentNumber.length - 1] == 2) {
            console.log(`${currentNumber}nd`);
        } else if (currentNumber[currentNumber.length - 1] == 3) {
            console.log(`${currentNumber}rd`);
        } else {
            console.log(`${currentNumber}th`);
        }
    }
}

findNumbers('The school has 256 students. In each class there are 26 chairs, 13 desks and 1 board.');

