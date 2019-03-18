function findCommonNumbers(firstArray, secondArray, thirdArray) {
    let commonNumbers = [];
    let average = 0;
    let median = 0;

    for (let i = 0; i < firstArray.length; i++) {
        let currentNumber = firstArray[i];

        if (secondArray.indexOf(currentNumber) !== -1 && thirdArray.indexOf(currentNumber) !== -1) {
            commonNumbers.push(currentNumber);
        }
    }

    commonNumbers = commonNumbers
        .sort((a, b) => a - b);

    average = commonNumbers.reduce((a, b) => a + b) / commonNumbers.length;

    if (commonNumbers.length % 2 === 0) {
        let numbersInTheMiddleSum = commonNumbers[commonNumbers.length / 2 - 1] + commonNumbers[commonNumbers.length / 2];
        median = numbersInTheMiddleSum / 2;
    } else if (commonNumbers.length % 2 !== 0) {
        let numberInTheMiddleIndex = Math.floor(commonNumbers.length / 2);
        median = commonNumbers[numberInTheMiddleIndex];
    }

    console.log(`The common elements are ${commonNumbers.join(', ')}.`);
    console.log(`Average: ${average}.`);
    console.log(`Median: ${median}.`);
}

findCommonNumbers(
    [5, 6, 50, 10, 1, 2],
    [5, 4, 8, 50, 2, 10],
    [5, 2, 50]);