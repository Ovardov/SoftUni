function findSameNumbers(givenNumber) {
    let numberInString = givenNumber.toString();
    let sumOfAllDigits = 0;
    let isSame = true;

    for (let i = 0; i < numberInString.length; i++) {
        sumOfAllDigits += +numberInString[i];
        for (let j = i; j < numberInString.length; j++) {
            if (+numberInString[i] !== +numberInString[j]) {
                isSame = false;
            }
        }
    }

    console.log(isSame);
    console.log(sumOfAllDigits);
}

findSameNumbers(1234);