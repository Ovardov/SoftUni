function solve(arr) {
    let vignette = {};

    arr.forEach(x => fillVignetteObject(x));

    let townWinner = Object.keys(vignette)
        .sort(findWinnerTown)[0];

    console.log(`${townWinner} is most profitable - ${findMostVignettePrice(townWinner)} BGN`);

    let carWinner = Object.keys(vignette[townWinner])
        .sort(findWinnerCar)[0];

    console.log(`Most driven model: ${carWinner}`);

    let townsWithCarWinner = Object.entries(vignette)
        .filter(x => vignette[x[0]].hasOwnProperty(carWinner));

    let sortedTowns = townsWithCarWinner
        .sort((a, b) => a[0].localeCompare(b[0]));

    for (let [town, stats] of sortedTowns) {

        let sortedRegNumbers = vignette[town][carWinner][1]
            .sort((a, b) => a.localeCompare(b));

        console.log(`${town}: ${sortedRegNumbers.join(', ')}`);
    }


    function fillVignetteObject(x) {
        if (!vignette.hasOwnProperty(x.town)) {
            vignette[x.town] = {[x.model]: [[x.price], [x.regNumber]]};
        } else if (vignette[x.town].hasOwnProperty(x.model)) {
            vignette[x.town][x.model][0].push(x.price);
            vignette[x.town][x.model][1].push(x.regNumber);
        } else if (vignette.hasOwnProperty(x.town)) {
            vignette[x.town][x.model] = [[x.price], [x.regNumber]];
        }
    }

    function findWinnerTown(a, b) {

        return findMostVignettePrice(b) - findMostVignettePrice(a)
            || findMostVignetteRegistered(b) - findMostVignetteRegistered(a)
            || a.localeCompare(b);

    }

    function findMostVignettePrice(town) {
        let totalPrice = 0;

        for (let [prices, regNumbers] of Object.values(vignette[town])) {
            totalPrice += prices
                .reduce((a, b) => a + b, 0);
        }

        return totalPrice;
    }

    function findMostVignetteRegistered(town) {
        let countOfRegNumbers = 0;

        for (let [prices, regNumbers] of Object.values(vignette[town])) {
            countOfRegNumbers += regNumbers.length;
        }

        return countOfRegNumbers;
    }

    function findWinnerCar(a, b) {
        return findModelMostVignettePrice(b) - findModelMostVignettePrice(a) || a.localeCompare(b);
    }

    function findModelMostVignettePrice(model) {
        let totalPrice = 0;

        totalPrice += vignette[townWinner][model][0]
            .reduce((a, b) => a + b, 0);

        return totalPrice;
    }

}

solve(
    [{model: 'BMW', regNumber: 'B1234SM', town: 'Varna', price: 10},
        {model: 'BMW', regNumber: 'C5959CZ', town: 'Sofia', price: 11},
        {model: 'Tesla', regNumber: 'NIKOLA', town: 'Burgas', price: 9},
        {model: 'Lada', regNumber: 'A3423SM', town: 'Varna', price: 11},
        {model: 'Lada', regNumber: 'SJSCA', town: 'Sofia', price: 11}]
);