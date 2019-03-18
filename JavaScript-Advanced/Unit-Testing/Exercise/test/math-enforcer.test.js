const mathEnforcer = require('../math-enforcer');
const assert = require('chai').assert;

describe('Math Calculator', function () {
    let mathCalculator;

    beforeEach(function () {
        mathCalculator = mathEnforcer;
    });

    it('should return object', function () {
        let result = mathEnforcer;

        assert.isObject(result)
    });

    describe('addFive', function () {
        it('should return result if we pass number in addFive', function () {
            let number = 5;

            let result = mathCalculator.addFive(number);

            assert.equal(result, 10);
        });

        it('should return result if we pass negative number in addFive', function () {
            let number = -1;

            let result = mathCalculator.addFive(number);

            assert.equal(result, 4)
        });

        it('should return result if we pass float number in addFive', function () {
            let number = 2.2;

            let result = mathCalculator.addFive(number);

            assert.equal(result, 7.2)
        });


        it('should return undefined if we pass string in addFive', function () {
            let number = '5';

            let result = mathCalculator.addFive(number);

            assert.isUndefined(result);
        });

    });

    describe('subtractTen', function () {
        it('should return result if we pass number in subtractTen', function () {
            let number = 33;

            let result = mathCalculator.subtractTen(number);

            assert.equal(result, 23);
        });

        it('should return result if we pass negative number in subtractTen', function () {
            let number = -1;

            let result = mathCalculator.subtractTen(number);

            assert.equal(result, -11);
        });

        it('should return result if we pass float negative number in subtractTen', function () {
            let number = -2.2;

            let result = mathCalculator.subtractTen(number);

            assert.equal(result, -12.2)
        });

        it('should return undefined if we pass string in subtractTen', function () {
            let number = '10';

            let result = mathCalculator.subtractTen(number);

            assert.isUndefined(result);
        });
    });

    describe('sum', function () {
        it('should return result if we pass two numbers in sum', function () {
            let firstNumber = 10;
            let secondNumber = 20;

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.equal(result, 30);
        });

        it('should return result if we pass two negative numbers in sum', function () {
            let firstNumber = -10;
            let secondNumber = -20;

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.equal(result, -30)
        });

        it('should return result if we pass one negative number in sum', function () {
            let firstNumber = -10;
            let secondNumber = 20;

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.equal(result, 10)
        });

        it('should return result if we pass two float negative numbers in sum', function () {
            let firstNumber = -10.5;
            let secondNumber = -20.5;

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.equal(result, -31)
        });

        it('should return result if we pass one float negative number in sum', function () {
            let firstNumber = -10.5;
            let secondNumber = -20;

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.equal(result, -30.5)
        });

        it('should return undefined if we pass one number and one string in sum', function () {
            let firstNumber = 10;
            let secondNumber = '20';

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.isUndefined(result);
        });

        it('should return undefined if we pass one number and one string in sum', function () {
            let firstNumber = '10';
            let secondNumber = 20;

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.isUndefined(result);
        });

        it('should return undefined if we pass two strings in sum', function () {
            let firstNumber = '10';
            let secondNumber = '20';

            let result = mathCalculator.sum(firstNumber, secondNumber);

            assert.isUndefined(result);
        });
    })
});