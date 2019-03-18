const createCalculator = require('../add-or-subtract');
const assert = require('chai').assert;

describe('Add, Subtract or Get', function () {
    let calculator;

    beforeEach(function () {
        calculator = createCalculator();
    });

    it('should return object', function () {
        let newCalculator = createCalculator();

        assert.isObject(newCalculator);
    });

    it('should return zero when get', function () {
        assert.equal(calculator.get(), 0)
    });

    it('should return positive number when add', function () {
        let input = 1;

        calculator.add(input);

        assert.equal(calculator.get(), 1);
    });

    it('should return negative number when subtract', function () {
        let input = 1;

        calculator.subtract(input);

        assert.equal(calculator.get(), -1)
    });

    it('should return zero when add and subtract same number', function () {
        let input = 1;

        calculator.add(input);
        calculator.subtract(input);

        assert.equal(calculator.get(), 0)
    });

    it('should return negative number if we passed negative number in add', function () {
        let input = -1;

        calculator.add(input);

        assert.equal(calculator.get(), -1)
    });

    it('should return positive number if we passed negative number in subtract', function () {
        let input = -1;

        calculator.subtract(input);

        assert.equal(calculator.get(), 1)
    });

    it('should return zero if we passed negative number in add and subtract', function () {
        let input = -1;

        calculator.add(input);
        calculator.subtract(input);

        assert.equal(calculator.get(), 0)
    });

    it('should return positive number when float number is given in add', function () {
        let input = 1.1;

        calculator.add(input);

        assert.equal(calculator.get(), 1.1)
    });

    it('should return positive number when float number is given in subtract', function () {
        let input = 1.1;

        calculator.subtract(input);

        assert.equal(calculator.get(), -1.1)
    });

    it('should return result when float number is given in add and subtract', function () {
        let inputAdd = 1.1;
        let inputSubtract = 0.2;

        calculator.add(inputAdd);
        calculator.subtract(inputSubtract);

        assert.equal(calculator.get(), inputAdd - inputSubtract);
    });

    it('should return positive number if we passed string number in add', function () {
        let input = '10';

        calculator.add(input);

        assert.equal(calculator.get(), 10);
    });

    it('should return positive number if we passed float string number in add', function () {
        let input = '3.14';

        calculator.add(input);

        assert.equal(calculator.get(), 3.14)
    });

    it('should return negative number if we passed negative string number in subtract', function () {
        let input = '10';

        calculator.subtract(input);

        assert.equal(calculator.get(), -10);
    });


    it('should return negative number if we passed negative string number in add', function () {
        let input = '-1';

        calculator.add(input);

        assert.equal(calculator.get(), -1)
    });

    it('should return zero if we passed string number in add and subtract', function () {
        let input = '10';

        calculator.add(input);
        calculator.subtract(input);

        assert.equal(calculator.get(), 0);
    });

    it('should return NaN if we pass string on add', function () {
        let input = 'text';

        calculator.add(input);

        assert.isNaN(calculator.get())
    });

    it('should return NaN if we pass string on subtract', function () {
        let input = 'text';

        calculator.subtract(input);

        assert.isNaN(calculator.get())
    });

    it('should return NaN if we pass empty object', function () {
        let input = {};

        calculator.add(input);

        assert.isNaN(calculator.get())
    });

    it('should return NaN when function is given', function () {
        let input = () => 0;

        calculator.add(input);

        assert.isNaN(calculator.get());
    });
});