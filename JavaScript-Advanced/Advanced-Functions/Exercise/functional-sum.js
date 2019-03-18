let add = (function () {
    let sum = 0;

    function addNumber(number) {
        sum += number;

        return addNumber;
    }

    addNumber.toString = function () {
        return sum;
    };

    return addNumber;
})();

add(1)(2);
