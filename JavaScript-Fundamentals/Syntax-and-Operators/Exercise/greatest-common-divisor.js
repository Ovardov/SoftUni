function calculateGreatestCommonDivisor(firstNumber, secondNumber) {

    while (firstNumber % secondNumber !== 0) {
        let gcd = firstNumber % secondNumber;
        if (gcd === 0) {
            break;
        }
        firstNumber = secondNumber;
        secondNumber = gcd;
    }

    console.log(secondNumber);
}

calculateGreatestCommonDivisor(2154, 458);