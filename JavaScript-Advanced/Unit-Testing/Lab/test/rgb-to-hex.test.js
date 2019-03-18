const rgbToHexColor = require('../rgb-to-hex');
const assert = require('chai').assert;

describe('RGB to Hex functionality', function () {

    it('should return undefined if we pass float red color', function () {
        let red = 0.5;
        let green = 20;
        let blue = 50;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass two float values', function () {
        let red = 0.5;
        let green = 20.5;
        let blue = 50;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass all float values', function () {
        let red = 0.5;
        let green = 20.5;
        let blue = 50.2;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass negative value', function () {
        let red = 50;
        let green = -5;
        let blue = 50;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass two colors with negative values', function () {
        let red = 50;
        let green = -5;
        let blue = -50;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass all colors with negative values', function () {
        let red = -250;
        let green = -5;
        let blue = -50;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass blue color with out of range value', function () {
        let red = 50;
        let green = 25;
        let blue = 500;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass two colors with out of range values', function () {
        let red = 50;
        let green = 2500;
        let blue = 500;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass all colors with out of range values', function () {
        let red = 550;
        let green = 258;
        let blue = 500;

        let result = rgbToHexColor(red, green, blue);

        assert.isUndefined(result);
    });

    it('should return hex if we pass red, green and blue color', function () {
        let red = 255;
        let green = 158;
        let blue = 170;

        let result = rgbToHexColor(red, green, blue);

        assert.equal(result, '#FF9EAA');
    });

    it('should return hex code for white', function () {
        let red = 255;
        let green = 255;
        let blue = 255;

        let result = rgbToHexColor(red, green, blue);

        assert.equal(result, '#FFFFFF');
    });

    it('should return hex if code for black', function () {
        let red = 0;
        let green = 0;
        let blue = 0;

        let result = rgbToHexColor(red, green, blue);

        assert.equal(result, '#000000');
    });

    it('should return undefined if we do not pass elements', function () {
        assert.isUndefined(rgbToHexColor());
    });

    it('should return undefined if we pass one element', function () {
        let red = 240;

        let result = rgbToHexColor(red);

        assert.isUndefined(result);
    });

    it('should return undefined if we pass two element', function () {
        let red = 240;
        let green = 250;

        let result = rgbToHexColor(red, green);

        assert.isUndefined(result);
    });

    it('should return undefined if elements are different type', function () {
        assert.isUndefined(rgbToHexColor('5', '5', '2'));
        assert.isUndefined(rgbToHexColor([], {}, []));
        assert.isUndefined(rgbToHexColor(() => true, () => true, () => true));
        assert.isUndefined(rgbToHexColor(() => 1, () => 1, () => 1));
        assert.isUndefined(rgbToHexColor(true, true, true));
        assert.isUndefined(rgbToHexColor(null, undefined, false));
        assert.isUndefined(rgbToHexColor({1: 1}, {2: 2}, {3: 3}));
        assert.isUndefined(rgbToHexColor([1], [2], [3]));
        assert.isUndefined(rgbToHexColor(1.2, 2.2, 3.3));
    });
});