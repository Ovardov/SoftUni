function solve(arr) {

    let buildCarBuilder = function () {
        let cars = {};

        return {
            create: name => cars[name] = {},
            inherits: (child, parent) => Object.setPrototypeOf(cars[child], cars[parent]),
            set: (name, key, value) => cars[name][key] = value,
            print: function (name) {
                let result = [];
                for (let key in cars[name]) {
                    result.push(`${key}:${cars[name][key]}`);
                }

                console.log(result.join(', '));
            }
        };
    };

    let carBuilder = buildCarBuilder();

    for (let token of arr) {
        let [firstCommand, ...args] = token.split(' ');

        if (firstCommand === 'create') {
            carBuilder.create(args[0]);

            if (args[1] === 'inherit') {
                carBuilder.inherits(args[0], args[2]);
            }

        } else if (firstCommand === 'set') {
            carBuilder.set(args[0], args[1], args[2]);
        } else if (firstCommand === 'print') {
            carBuilder.print(args[0]);
        }
    }
}

solve(
    ['create c1',
        'create c2 inherit c1',
        'set c1 color red',
        'set c2 model new',
        'print c1',
        'print c2']
);