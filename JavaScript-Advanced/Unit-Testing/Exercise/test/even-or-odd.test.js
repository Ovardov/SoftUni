let isOddOrEven = require('../even-or-odd');

const expect = require('chai').expect;

describe('Even or Odd', function () {

    it('should return undefined if we pass a number', function () {
        let number = 20;

        let expected = isOddOrEven(number);

        expect(expected).to.equal(undefined);
    });

    it('should return even if we pass a string with even length', function () {
        let string = 'Alex';

        let expected = isOddOrEven(string);

        expect(expected).to.equal('even');
    });

    it('should return odd if we pass a string with even length', function () {
        let string = 'Example';

        let expected = isOddOrEven(string);

        expect(expected).to.equal('odd');
    });
});