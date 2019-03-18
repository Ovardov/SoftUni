function extractNonDecreasingSubsequence(arr) {
    let maxNumber = 0;

    for (let currentNumber of arr) {

        if (currentNumber >= maxNumber) {
            maxNumber = currentNumber;
            console.log(maxNumber);
        }
    }
}

extractNonDecreasingSubsequence([1, 3, 8, 4, 10, 12, 3, 2, 24]);