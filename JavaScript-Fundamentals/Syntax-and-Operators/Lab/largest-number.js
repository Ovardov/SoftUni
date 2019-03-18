function findLargestNumber(firstNumber, secondNumber, thirdNumber) {
    let maxNumber = -Infinity;

    maxNumber = Math.max(firstNumber, secondNumber, thirdNumber);

    console.log(`The largest number is ${maxNumber}.`);
}

findLargestNumber(5, 16, 0);