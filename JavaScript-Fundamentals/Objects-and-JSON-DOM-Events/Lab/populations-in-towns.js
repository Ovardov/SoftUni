function calculatePopulationInTowns(arr) {
    let towns = {};

    for (let token of arr) {
        let [townName, population] = token.split(' <-> ');
        population = +population;

        if (towns.hasOwnProperty(townName)) {
            towns[townName] += population;
        } else {
            towns[townName] = population;
        }
    }

    for (let [townName, population] of Object.entries(towns)) {
        console.log(`${townName} : ${population}`);
    }
}

calculatePopulationInTowns(
    ['Sofia <-> 1200000',
        'Montana <-> 20000',
        'New York <-> 10000000',
        'Washington <-> 2345000',
        'Las Vegas <-> 1000000']);