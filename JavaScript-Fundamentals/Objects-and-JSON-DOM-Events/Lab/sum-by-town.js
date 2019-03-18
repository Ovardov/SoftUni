function calculateSum(arr) {

    let townsIncome = {};

    for (let i = 0; i < arr.length - 1; i += 2) {
        let town = arr[i];
        let number = +arr[i + 1];

        if (townsIncome.hasOwnProperty(town)) {
            townsIncome[town] += number;
        } else {
            townsIncome[town] = number;
        }
    }

    console.log(JSON.stringify(townsIncome));
}

calculateSum(['Sofia', '20', 'Varna', '3', 'Sofia', '5', 'Varna', '4']);