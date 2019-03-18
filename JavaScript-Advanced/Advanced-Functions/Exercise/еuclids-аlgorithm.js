function findGreatestCommonDivisor(firstNumber, secondNumber) {

    if (secondNumber === 0) {
        return firstNumber;
    }

    return findGreatestCommonDivisor(secondNumber, firstNumber % secondNumber);
}

console.log(findGreatestCommonDivisor(252, 105));