const lookupChar = require('../char-lookup');
const assert = require('chai').assert;

describe('Look up char', function () {
    it('should return undefined if we do not pass string', function () {
        let string = 555;
        let index = 2;

        let result = lookupChar(string, index);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass float number for index', function () {
        let string = 'test';
        let index = 1.2;

        let result = lookupChar(string, index);

        assert.isUndefined(result)
    });

    it('should return undefined if we do not pass string and integer index', function () {
        let string = 255;
        let index = 1.2;

        let result = lookupChar(string, index);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass string for index', function () {
        let string = 'test';
        let index = '2';

        let result = lookupChar(string, index);

        assert.isUndefined(result)
    });

    it('should return Incorrect index if string length < index', function () {
        let string = 'test';
        let index = 10;

        let result = lookupChar(string, index);

        assert.equal(result, 'Incorrect index');
    });

    it('should return Incorrect index if string length === index', function () {
        let string = 'test';
        let index = 4;

        let result = lookupChar(string, index);

        assert.equal(result, 'Incorrect index');
    });

    it('should return Incorrect index if we pass index that is less than zero', function () {
        let string = 'test';
        let index = -1;

        let result = lookupChar(string, index);

        assert.equal(result, 'Incorrect index');
    });

    it('should return result if we pass string and index', function () {
        let string = 'test';
        let index = 2;

        let result = lookupChar(string, index);

        assert.equal(result, 's')
    });
});