function convertToJSON(arr) {
    arr.shift();

    let towns = [];

    for (let currentGivenValues of arr) {
        let [townName, latitude, longitude] = currentGivenValues
            .split('|')
            .filter(x => x !== '')
            .map(x => x.trim());

        let currentTown = {
            Town: townName,
            Latitude: Number(latitude),
            Longitude: Number(longitude)
        };

        towns.push(currentTown);
    }

    console.log(JSON.stringify(towns));
}

convertToJSON(
    ['| Town | Latitude | Longitude |',
        '| Sofia | 42.696552 | 23.32601 |',
        '| Beijing | 39.913818 | 116.363625 |']);