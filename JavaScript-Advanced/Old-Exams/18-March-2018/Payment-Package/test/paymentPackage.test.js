const PaymentPackage = require('../paymentPackage');
const assert = require('chai').assert;

describe('Payment Package', function () {

    describe('Constructor', function () {
        it('should be instantiated with two parameters – a string name and number value', function () {
            let testPackage = new PaymentPackage('Consultation', 600);

            assert.equal(testPackage.name, 'Consultation');
            assert.equal(testPackage.value, 600);
            assert.equal(testPackage.VAT, 20);
            assert.equal(testPackage.active, true);
        });
    });

    describe('Set and Get name', function () {
        it('should throw error if type of name is not a string', function () {

            assert.throw(function () {
                let testPackage = new PaymentPackage(1, 600);
            }, 'Name must be a non-empty string');
        });

        it('should throw error if name is empty string', function () {

            assert.throw(function () {
                let testPackage = new PaymentPackage('', 600);
            }, 'Name must be a non-empty string');

        });

        it('should throw error if we do not pass a name', function () {

            assert.throw(function () {
                let testPackage = new PaymentPackage(600);
            }, 'Name must be a non-empty string');

        });

        it('should work if we pass a string', function () {
            let testPackage = new PaymentPackage('Test', 600);

            assert.equal(testPackage.name, 'Test');

        });
    });

    describe('Set and Get value', function () {
        it('should throw error if type of value is not a number', function () {
            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', '5');
            }, 'Value must be a non-negative number');

        });

        it('should throw error if value is a negative number', function () {
            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', -1);
            }, 'Value must be a non-negative number');
        });

        it('should throw error if we do not pass a value', function () {
            assert.throw(function () {
                let testPackage = new PaymentPackage('Test',);
            }, 'Value must be a non-negative number');
        });

        it('should work if we pass a number', function () {
            let testPackage = new PaymentPackage('Test', 600);

            assert.equal(testPackage.value, 600);

        });

    });

    describe('Set and get VAT', function () {
        it('should throw error if type of VAT is not a number', function () {
            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.VAT = '20';

            }, 'VAT must be a non-negative number');

        });

        it('should throw error if VAT is a negative number', function () {
            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.VAT = -1;

            }, 'VAT must be a non-negative number');
        });

        it('should work if we pass a number', function () {
            let testPackage = new PaymentPackage('Test', 600);
            testPackage.VAT = 30;

            assert.equal(testPackage.VAT, 30);

        });
    });

    describe('Set and get active', function () {
        it('should throw error if we do not pass boolean', function () {

            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.active = 'test';
            }, 'Active status must be a boolean');

            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.active = 20;
            }, 'Active status must be a boolean');

            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.active = [];
            }, 'Active status must be a boolean');

            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.active = {};
            }, 'Active status must be a boolean');

            assert.throw(function () {
                let testPackage = new PaymentPackage('Test', 5);
                testPackage.active = null;
            }, 'Active status must be a boolean');
        });

        it('should work if we pass a boolean', function () {
            let testPackageTrue = new PaymentPackage('Test', 5);
            let testPackageFalse = new PaymentPackage('Test', 5);

            testPackageTrue.active = true;
            testPackageFalse.active = false;

            assert.equal(testPackageTrue.active, true);
            assert.equal(testPackageFalse.active, false);
        });
    });

    describe('function toString()', function () {
        it('should return a string', function () {
            const packages = [
                new PaymentPackage('HR Services', 1500),
                new PaymentPackage('Consultation', 800),
                new PaymentPackage('Partnership Fee', 7000),
            ];

            assert.equal(packages.toString(), 'Package: HR Services\n' +
                '- Value (excl. VAT): 1500\n' +
                '- Value (VAT 20%): 1800,Package: Consultation\n' +
                '- Value (excl. VAT): 800\n' +
                '- Value (VAT 20%): 960,Package: Partnership Fee\n' +
                '- Value (excl. VAT): 7000\n' +
                '- Value (VAT 20%): 8400');

        });

        it('should return a string if we pass value 0', function () {
            let testPackage = new PaymentPackage('HR Services', 0);

            let result = `Package: HR Services\n`;
            result += `- Value (excl. VAT): 0\n`;
            result += `- Value (VAT 20%): 0`;

            assert.equal(testPackage.toString(), result);
        });

        it('should return a string with inactive', function () {
            let testPackage = new PaymentPackage('HR Services', 1500);
            testPackage.active = false;

            let result = `Package: HR Services (inactive)\n`;
            result += `- Value (excl. VAT): 1500\n`;
            result += `- Value (VAT 20%): 1800`;

            assert.equal(testPackage.toString(), result);
        });
    });
});