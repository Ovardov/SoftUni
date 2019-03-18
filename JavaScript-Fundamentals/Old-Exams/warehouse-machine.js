function solve(arr) {

    let warehouse = {};

    for (let token of arr) {

        if (token === 'REPORT') {
            printProducts();
        } else if (token === 'INSPECTION') {
            printSortedProducts();
        } else if (token.startsWith('IN')) {
            addProduct(token)
        } else if (token.startsWith('OUT')) {
            removeProduct(token);
        }
    }

    function addProduct(token) {
        let [command, brand, coffeeName, inputExpireDate, quantity] = token.split(', ');
        quantity = +quantity;

        if (warehouse.hasOwnProperty(brand) && !warehouse[brand].hasOwnProperty(coffeeName)) {
            warehouse[brand][coffeeName] = [inputExpireDate, quantity];

        } else if (warehouse.hasOwnProperty(brand) && warehouse[brand].hasOwnProperty(coffeeName)) {
            let expireDate = warehouse[brand][coffeeName][0];

            if (inputExpireDate > expireDate) {
                warehouse[brand][coffeeName][0] = inputExpireDate;
                warehouse[brand][coffeeName][1] = quantity;

            } else if (expireDate == inputExpireDate) {
                warehouse[brand][coffeeName][1] += quantity;
            }

        } else {
            warehouse[brand] = {[coffeeName]: [inputExpireDate, quantity]}
        }
    }

    function removeProduct(token) {
        let [command, brand, coffeeName, inputExpireDate, quantity] = token.split(', ');
        quantity = +quantity;

        if (warehouse.hasOwnProperty(brand) && warehouse[brand].hasOwnProperty(coffeeName)) {
            let [expireDate, oldQuantity] = warehouse[brand][coffeeName];
            if (expireDate > inputExpireDate && oldQuantity > quantity) {
                warehouse[brand][coffeeName][1] -= quantity;
            }
        }
    }

    function printProducts() {
        console.log('>>>>> REPORT! <<<<<');

        for (let [brand, coffeeNameWithValues] of Object.entries(warehouse)) {
            console.log(`Brand: ${brand}:`);

            for (let [coffeeName, values] of Object.entries(coffeeNameWithValues)) {
                console.log(`-> ${coffeeName} -> ${values[0]} -> ${values[1]}.`);
            }
        }
    }

    function printSortedProducts() {
        console.log('>>>>> INSPECTION! <<<<<');

        let sortedBrands = Object.entries(warehouse)
            .sort((a, b) => a[0].localeCompare(b[0]));

        for (let [brand, coffeeNameWithValues] of sortedBrands) {
            let sortedByQuantity = Object.entries(coffeeNameWithValues)
                .sort((a, b) => b[1][1] - a[1][1]);

            console.log(`Brand: ${brand}:`);

            for (let [coffeeName, values] of sortedByQuantity) {
                console.log(`-> ${coffeeName} -> ${values[0]} -> ${values[1]}.`)
            }
        }
    }
}

solve(
    [
        "IN, Batdorf & Bronson, Espresso, 2025-05-25, 20",
        "IN, Folgers, Black Silk, 2023-03-01, 14",
        "IN, Lavazza, Crema e Gusto, 2023-05-01, 5",
        "IN, Lavazza, Crema e Gusto, 2023-05-02, 5",
        "IN, Folgers, Black Silk, 2022-01-01, 10",
        "IN, Lavazza, Intenso, 2022-07-19, 20",
        "OUT, Dallmayr, Espresso, 2022-07-19, 5",
        "OUT, Dallmayr, Crema, 2022-07-19, 5",
        "OUT, Lavazza, Crema e Gusto, 2020-01-28, 2",
        "REPORT",
        "INSPECTION",
        ]);