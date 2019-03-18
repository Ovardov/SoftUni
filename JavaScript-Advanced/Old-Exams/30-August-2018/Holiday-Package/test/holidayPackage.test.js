const assert = require('chai').assert;
const HolidayPackage = require('../holidayPackage');

describe('Holiday Package', function () {
    let holidayPackage;

    beforeEach(function () {
        holidayPackage = new HolidayPackage();
    });

    describe('Constructor', function () {

        it('should be instantiated with two parameters – a string destination and a string season.', function () {
            holidayPackage.destination = 'Dubai';
            holidayPackage.season = 'Winter';

            assert.equal(holidayPackage.destination, 'Dubai');
            assert.equal(holidayPackage.season, 'Winter');
        });

        it('should vacationers be an empty array', function () {
            assert.isArray(holidayPackage.vacationers);
            assert.isEmpty(holidayPackage.vacationers);
        });

        it('should return false, default value', function () {
            assert.equal(holidayPackage.insuranceIncluded, false);
        });

        it('should return true if we pass true', function () {
            holidayPackage.insuranceIncluded = true;

            assert.equal(holidayPackage.insuranceIncluded, true);
        });

    });

    describe('function showVacationers()', function () {

        it('should return no vacationers are added yet if array is empty', function () {
            assert.equal(holidayPackage.showVacationers(), 'No vacationers are added yet');
        });

        it('should return vacationers if we add elements', function () {
            holidayPackage.vacationers.push('Pesho');
            holidayPackage.vacationers.push('Gosho');

            let result = `Vacationers:\n`;
            result += 'Pesho\n';
            result += 'Gosho';

            assert.equal(holidayPackage.showVacationers(), result)
        });
    });

    describe('function addVacationer()', function () {
        it('should throw error Vacationer name must be a non-empty string if we do not pass a string', function () {
            assert.throw(() => holidayPackage.addVacationer(3), 'Vacationer name must be a non-empty string');
            assert.throw(() => holidayPackage.addVacationer([3]), 'Vacationer name must be a non-empty string');
            assert.throw(() => holidayPackage.addVacationer({'key': 3}), 'Vacationer name must be a non-empty string');
            assert.throw(() => holidayPackage.addVacationer(() => true), 'Vacationer name must be a non-empty string');
            assert.throw(() => holidayPackage.addVacationer(true), 'Vacationer name must be a non-empty string');
            assert.throw(() => holidayPackage.addVacationer(false), 'Vacationer name must be a non-empty string');
        });

        it('should throw error Vacationer name must be a non-empty string if we pass an empty string', function () {
            assert.throw(() => holidayPackage.addVacationer(' '), 'Vacationer name must be a non-empty string');
        });

        it('should throw error Name must consist of first name and last name if we pass first name', function () {
            assert.throw(() => holidayPackage.addVacationer('Pesho'), 'Name must consist of first name and last name');
            assert.throw(() => holidayPackage.addVacationer('Pesho Peshov Peshov'), 'Name must consist of first name and last name');
        });

        it('should add name if we pass first name and last name', function () {
            holidayPackage.addVacationer('Pesho Peshov');

            assert.equal(holidayPackage.vacationers, 'Pesho Peshov')
        });

        // it('should add name if we pass many first name and last name', function () {
        //     holidayPackage.addVacationer('Pesho Peshov');
        //     holidayPackage.addVacationer('Gosho Goshov');
        //     holidayPackage.addVacationer('Stamat Stamatov');
        //
        //
        //     assert.equal(holidayPackage.vacationers, ['Pesho Peshov','Gosho Goshov','Stamat Stamatov']);
        // });
    });

    describe('function generateHolidayPackage()', function () {
        it('should return throw if do not have vacationers', function () {
            assert.throw(() => holidayPackage.generateHolidayPackage(), 'There must be at least 1 vacationer added');
        });

        it('should return information if we have vacationers and summer season', function () {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            holidayPackage.destination = 'Italy';
            holidayPackage.season = 'Summer';

            holidayPackage.insuranceIncluded = true;

            let result = 'Holiday Package Generated\n' +
                'Destination: Italy\n' +
                'Vacationers:\n' +
                'Ivan Ivanov\n' +
                'Petar Petrov\n' +
                'Georgi Georgiev\n' +
                'Price: 1500';

            assert.equal(holidayPackage.generateHolidayPackage(), result);
        });

        it('should return information if we have vacationers summer season and false insurance', function () {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            holidayPackage.destination = 'Italy';
            holidayPackage.season = 'Summer';

            holidayPackage.insuranceIncluded = false;

            let result = 'Holiday Package Generated\n' +
                'Destination: Italy\n' +
                'Vacationers:\n' +
                'Ivan Ivanov\n' +
                'Petar Petrov\n' +
                'Georgi Georgiev\n' +
                'Price: 1400';

            assert.equal(holidayPackage.generateHolidayPackage(), result);
        });

        it('should return information if we have vacationers and winter season', function () {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            holidayPackage.destination = 'Italy';
            holidayPackage.season = 'Winter';

            holidayPackage.insuranceIncluded = true;

            let result = 'Holiday Package Generated\n' +
                'Destination: Italy\n' +
                'Vacationers:\n' +
                'Ivan Ivanov\n' +
                'Petar Petrov\n' +
                'Georgi Georgiev\n' +
                'Price: 1500';

            assert.equal(holidayPackage.generateHolidayPackage(), result);
        });

        it('should return information if we have vacationers winter season and false insurance', function () {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            holidayPackage.destination = 'Italy';
            holidayPackage.season = 'Winter';

            holidayPackage.insuranceIncluded = false;

            let result = 'Holiday Package Generated\n' +
                'Destination: Italy\n' +
                'Vacationers:\n' +
                'Ivan Ivanov\n' +
                'Petar Petrov\n' +
                'Georgi Georgiev\n' +
                'Price: 1400';

            assert.equal(holidayPackage.generateHolidayPackage(), result);
        });

        it('should return information if we have vacationers and false insurance', function () {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            holidayPackage.destination = 'Italy';

            holidayPackage.insuranceIncluded = false;

            let result = 'Holiday Package Generated\n' +
                'Destination: Italy\n' +
                'Vacationers:\n' +
                'Ivan Ivanov\n' +
                'Petar Petrov\n' +
                'Georgi Georgiev\n' +
                'Price: 1200';

            assert.equal(holidayPackage.generateHolidayPackage(), result);
        });

        it('should return information if we have vacationers and true insurance', function () {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');

            holidayPackage.destination = 'Italy';

            holidayPackage.insuranceIncluded = true;

            let result = 'Holiday Package Generated\n' +
                'Destination: Italy\n' +
                'Vacationers:\n' +
                'Ivan Ivanov\n' +
                'Petar Petrov\n' +
                'Georgi Georgiev\n' +
                'Price: 1300';

            assert.equal(holidayPackage.generateHolidayPackage(), result);
        });
    });
});