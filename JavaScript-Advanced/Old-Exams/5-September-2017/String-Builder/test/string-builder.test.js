const StringBuilder = require('../string-builder');
const assert = require('chai').assert;


describe('String Builder', function () {

    describe('constructor', function () {
        it('should be empty array if we do not pass a string', function () {
            let stringBuilder = new StringBuilder();

            assert.isArray(stringBuilder._stringArray);
            assert.isEmpty(stringBuilder._stringArray);
        });

        it('should be array of string if we pass a string', function () {
            let stringBuilder = new StringBuilder('test');

            assert.deepEqual(stringBuilder._stringArray, ['t', 'e', 's', 't']);
        });


        it('should throw error if we do not pass correct type', function () {
            assert.throw(function () {
                let stringBuilder = new StringBuilder(['test']);

            }, 'Argument must be string');

            assert.throw(function () {
                let stringBuilder = new StringBuilder([]);

            }, 'Argument must be string');

            assert.throw(function () {
                let stringBuilder = new StringBuilder({'test': 2});

            }, 'Argument must be string');

            assert.throw(function () {
                let stringBuilder = new StringBuilder(true);

            }, 'Argument must be string');

            assert.throw(function () {
                let stringBuilder = new StringBuilder(5);

            }, 'Argument must be string');
        });
    });

    describe('function append(string)', function () {
        it('should append new string', function () {
            let stringBuilder = new StringBuilder('first');
            stringBuilder.append('test');

            assert.deepEqual(stringBuilder._stringArray, ['f', 'i', 'r', 's', 't', 't', 'e', 's', 't']);
        });

        it('should throw error if we do not pass a string', function () {
            assert.throw(function () {
                let stringBuilder = new StringBuilder('test');
                stringBuilder.append(1);

            }, 'Argument must be string');
        });
    });

    describe('function prepend(string)', function () {
        it('should prepend new string', function () {
            let stringBuilder = new StringBuilder('test');
            stringBuilder.prepend('first');

            assert.deepEqual(stringBuilder._stringArray, ['f', 'i', 'r', 's', 't', 't', 'e', 's', 't']);
        });

        it('should throw error if we do not pass a string', function () {
            assert.throw(function () {
                let stringBuilder = new StringBuilder('test');
                stringBuilder.prepend(1);

            }, 'Argument must be string');
        });
    });

    describe('function insertAt(string, index)', function () {
        it('should insert string at input index', function () {
            let stringBuilder = new StringBuilder('first');
            stringBuilder.insertAt('test', 1);

            assert.deepEqual(stringBuilder._stringArray, ['f', 't', 'e', 's', 't', 'i', 'r', 's', 't'])
        });

        it('should throw error if we do not pass a string', function () {
            assert.throw(function () {
                let stringBuilder = new StringBuilder('test');
                stringBuilder.insertAt(1, 1);

            }, 'Argument must be string');
        });
    });

    describe('function remove(startIndex, length)', function () {
        it('should remove elements', function () {
            let stringBuilder = new StringBuilder('first');
            stringBuilder.remove(1, 3);

            assert.deepEqual(stringBuilder._stringArray, ['f', 't'])
        });

    });

    describe('function toString()', function () {
        it('should return string joined by empty string', function () {
            let stringBuilder = new StringBuilder('last');
            stringBuilder.prepend('one');
            stringBuilder.append('test');
            stringBuilder.insertAt('insert', 1);
            stringBuilder.remove(1, 6);


            assert.equal(stringBuilder.toString(), 'onelasttest');
        });
    });

    describe('all functions', function () {
        it('should class has all functions', function () {
            let stringBuilder = new StringBuilder();

            assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('append'), true);
            assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('prepend'), true);
            assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('insertAt'), true);
            assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('remove'), true);
            assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('toString'), true);
        });
    });
});