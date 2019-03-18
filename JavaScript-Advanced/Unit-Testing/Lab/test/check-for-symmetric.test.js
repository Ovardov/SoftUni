const isSymmetric = require('../check-for-symmetry');

const assert = require('chai').assert;

describe('isSymmetric functionality', function () {

    it('should return false if we do not pass array', function () {
        let arr = 'test';

        let result = isSymmetric(arr);

        assert.isFalse(result);
    });

    it('should return true if the input array is symmetric', function () {
        let arr = ['Noon', 'Noon'];

        let result = isSymmetric(arr);

        assert.isTrue(result);
    });

    it('should return false if the input array is not symmetric', function () {
        let arr = ['firstTest', 'secondTest'];

        let result = isSymmetric(arr);

        assert.isFalse(result);
    });

    it('should return true if we pass empty array', function () {
        let arr = [];

        let result = isSymmetric(arr);

        assert.isTrue(result);
    });

    it('should return true when elements are different types', function () {
        let input = [1, {}, [], [], {}, 1];

        let result = isSymmetric(input);

        assert.isTrue(result);
    });

});