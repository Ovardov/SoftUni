function solve() {
    let fib = (function () {
        let firstNumber = 0;
        let secondNumber = 1;

        return function () {
            let result = secondNumber;
            let sum = firstNumber + secondNumber;

            firstNumber = secondNumber;
            secondNumber = sum;

            return result;
        }
    })();

    console.log(fib()); // 1
    console.log(fib()); // 1
    console.log(fib()); // 2
    console.log(fib()); // 3
}

solve();