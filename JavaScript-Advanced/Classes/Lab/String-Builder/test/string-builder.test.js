const StringBuilder = require('../string-builder');
const assert = require('chai').assert;

describe('String Builder', function () {
    let testString;

    beforeEach(function () {
        testString = new StringBuilder();
    });

    describe('Constructor', function () {
        it('should return result if we pass string', function () {
            testString = new StringBuilder('test');

            let result = testString._stringArray.join('');

            assert.equal(result, 'test');
        });

        it('should return empty string if we pass undefined', function () {
            testString = new StringBuilder(undefined);

            let result = testString._stringArray.join('');

            assert.equal(result, '')
        });
    });

    describe('Append', function () {
        it('should throw error if we pass number', function () {
            let errorFunc = () => testString.append(5);

            assert.throw(errorFunc, 'Argument must be string');
        });

        it('should return result if we pass string', function () {
            testString.append('test');

            let result = testString._stringArray.join('');

            assert.equal(result, 'test')
        });
    });

    describe('Prepend', function () {
        it('should throw error if we pass number', function () {
            let errorFunc = () => testString.prepend(5);

            assert.throw(errorFunc, 'Argument must be string');
        });

        it('should return result if we pass string', function () {
            testString = new StringBuilder('test')
            testString.prepend('first');

            let result = testString._stringArray.join('');

            assert.equal(result, 'firsttest')
        });
    });

    describe('Insert At', function () {

        it('should return result if we insert at begining', function () {
            testString = new StringBuilder('test');
            testString.insertAt('final ', 0)

            let result = testString._stringArray.join('');

            assert.equal(result, 'final test')
        });

        it('should return result if we insert at middle', function () {
            testString = new StringBuilder('test');
            testString.insertAt('AAA', 2);

            let result = testString._stringArray.join('');

            assert.equal(result, 'teAAAst');
        });

        it('should return resut if we insert at end', function () {
            testString = new StringBuilder('test');
            testString.insertAt('final', 4);

            let result = testString._stringArray.join('');

            assert.equal(result, 'testfinal')
        });

        it('should return result if we pass string', function () {
            let str = 'wtf';
            testString = new StringBuilder('test');

            testString.insertAt(str, 0);

            let expected = Array.from('test');
            expected.splice(0, 0, ...str);

            compareArray(testString._stringArray, expected);
        });

        it('should return throw if we do not pass string', function () {
            testString = new StringBuilder('test');

            let errorFunc = () => testString.insertAt(5, 0);

            assert.throw(errorFunc, 'Argument must be string');

        });
    });

    describe('Remove', function () {
        it('should return result if we pass string, start index and length', function () {
            testString = new StringBuilder('teest');
            testString.remove(1, 1);

            let result = testString._stringArray.join('');

            assert.equal(result, 'test')
        });

        it('should return result if we pass string, start index and length as a string', function () {
            testString = new StringBuilder('teest');
            testString.remove('1', '1');

            let result = testString._stringArray.join('');

            assert.equal(result, 'test')
        });

        it('should return result if we pass string, start index and length that is more than string length', function () {
            testString = new StringBuilder('test');
            testString.remove(3, 4);

            let result = testString._stringArray.join('');

            assert.equal(result, 'tes');
        });
    });

    describe('To String', function () {
        it('should return result if we pass string', function () {
            testString.append('test');

            let result = testString.toString();

            assert.equal(result, 'test')
        });
    });

    describe('Functions', function () {
        it('should functions exist', function () {
            assert.equal(StringBuilder.prototype.hasOwnProperty('append'), true);
            assert.equal(StringBuilder.prototype.hasOwnProperty('prepend'), true);
            assert.equal(StringBuilder.prototype.hasOwnProperty('insertAt'), true);
            assert.equal(StringBuilder.prototype.hasOwnProperty('remove'), true);
            assert.equal(StringBuilder.prototype.hasOwnProperty('toString'), true);

        });
    });

    function compareArray(testString, expected) {
        assert.equal(testString.length, expected.length);
        for (let i = 0; i < testString.length; i++) {
            assert.equal(testString[i], expected[i]);
        }
    }
});