const Calculator = require('../Calculator');
const assert = require('chai').assert;

describe('Calculator', function () {
    let calculator;

    beforeEach(function () {
        calculator = new Calculator();
    });

    describe('constructor', function () {
        it('should contains a property expenses that is initialized to an empty array', function () {

            assert.isArray(calculator.expenses);
            assert.isEmpty(calculator.expenses);
        });
    });

    describe('function add(data)', function () {
        it('should push element if we add primitive', function () {
            calculator.add(5);
            calculator.add('text');
            calculator.add(5.5);
            calculator.add(true);

            assert.deepEqual(calculator.expenses, [5, 'text', 5.5, true]);
        });

        it('should push element if we add reference', function () {
            calculator.add({key: 'value'});
            calculator.add([1]);

            assert.deepEqual(calculator.expenses, [{key: 'value'}, [1]]);
        });
    });

    describe('function divideNums()', function () {
        it('should return number if we add two numbers', function () {
            calculator.add(100);
            calculator.add(5);

            assert.equal(calculator.divideNums(), 20);
        });

        it('should return number if we add three numbers', function () {
            calculator.add(100);
            calculator.add(5);
            calculator.add(2);

            assert.equal(calculator.divideNums(), 10);
        });

        it('should throw error if array is empty', function () {
            assert.throw(() => calculator.divideNums(), 'There are no numbers in the array!');
        });

        it('should throw error if array have no numbers', function () {
            calculator.add('test');
            calculator.add('{}');
            calculator.add('second test');

            assert.throw(() => calculator.divideNums(), 'There are no numbers in the array!');
        });

        it('should return Cannot divide by zero if we add 0 in array', function () {
            calculator.add(5);
            calculator.add(0);

            assert.equal(calculator.divideNums(), 'Cannot divide by zero');
        });

        it('should return number if we add float numbers', function () {
            calculator.add(10.5);
            calculator.add(2);

            assert.closeTo(calculator.divideNums(), 5.25, 0.01)
        });
    });

    describe('function toString()', function () {
        it('should return array join by ->', function () {
            calculator.add(10);
            calculator.add('Pesho');
            calculator.add(5);

            assert.equal(calculator.toString(), '10 -> Pesho -> 5')
        });

        it('should return empty array if array is empty', function () {
            assert.equal(calculator.toString(), 'empty array');
        });

        it('should return one element if we add one element', function () {
            calculator.add(1);

            assert.equal(calculator.toString(), '1');
        });
    });

    describe('function orderBy()', function () {
        it('should return empty if array is empty', function () {
            assert.equal(calculator.orderBy(), 'empty')
        });

        it('should sort elements in ascending order if we add numbers', function () {
            calculator.add(10);
            calculator.add(-1);
            calculator.add(3);
            calculator.add(30);

            assert.equal(calculator.orderBy(), '-1, 3, 10, 30');
        });

        it('should sort element if we add mixed data', function () {
            calculator.add({});
            calculator.add([1, 2, 3]);
            calculator.add(true);
            calculator.add('test');

            assert.equal(calculator.orderBy(), '1,2,3, [object Object], test, true')
        });
    })
});