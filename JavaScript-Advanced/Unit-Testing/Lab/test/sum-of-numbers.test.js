const sum = require('../sum-of-numbers');

const assert = require('chai').assert;

describe('sum of array of numbers', function () {

    it('should return sum of numbers if we pass an array with numbers', function () {
        let arr = [5, 3, 4, 2];

        let result = sum(arr);

        assert.equal(result, 14);
    });

    it('should return 0 if we pass an empty array', function () {
        let arr = [];

        let result = sum(arr);

        assert.equal(result, 0);
    });

    it('should return NaN if we pass an array with strings', function () {
        let arr = ['pesho', 'gosho'];

        let result = sum(arr);

        assert.isNaN(result);
    });
});