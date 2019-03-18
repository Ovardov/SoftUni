function assembleCar(input) {
    let car = {
        model: input.model,
        engine: {power: input.power, volume: 0},
        carriage: {type: input.carriage, color: input.color},
        wheels: []
    };

    if (input.power <= 90) {
        car.engine.volume = 1800;
        car.engine.power = 90;
    } else if (input.power <= 120) {
        car.engine.volume = 2400;
        car.engine.power = 120;
    } else if (input.power <= 200) {
        car.engine.power = 200;
        car.engine.volume = 3500;
    }

    if (input.wheelsize % 2 === 0) {
        for (let i = 0; i < 4; i++) {
            car.wheels.push(input.wheelsize - 1);
        }
    } else {
        for (let i = 0; i < 4; i++) {
            car.wheels.push(input.wheelsize);
        }
    }

    return car;
}

assembleCar(
    {
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    });