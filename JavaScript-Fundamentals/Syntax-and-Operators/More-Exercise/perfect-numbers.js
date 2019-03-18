function findPerfectNumbers(arr) {
    let perfectNumbers = [];

    for (let currentNumber of arr) {
        let divisors = [];
        if (Number.isInteger(currentNumber)) {
            for (let i = 1; i < currentNumber; i++) {
                if (currentNumber % i === 0) {
                    divisors.push(i);
                }
            }

            divisors = divisors
                .reduce((a, b) => a + b, 0);

            if (currentNumber === divisors && currentNumber === (divisors + currentNumber) / 2) {
                perfectNumbers.push(currentNumber);
            }
        }
    }

    if (perfectNumbers.length > 0) {
        console.log(perfectNumbers.join(', '));
    } else {
        console.log('No perfect number');
    }
}

findPerfectNumbers([1.1]);