function calculateMoney(arr) {

    let drinks = {
        caffeine: 0.80,
        decaf: 0.90,
        tea: 0.80
    };

    let allMoneyEarned = 0;

    for (let token of arr) {
        let fullDrinkPrice = 0;

        token.includes('coffee')
            ? calculateCoffee(fullDrinkPrice, token)
            : calculateTea(fullDrinkPrice, token);

    }

    function printPositiveResult(drink, price, change) {
        allMoneyEarned += price;
        console.log(`You ordered ${drink}. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
    }

    function printNegativeResult(drink, moneyNeeded) {
        console.log(`Not enough money for ${drink}. Need ${moneyNeeded.toFixed(2)}$ more.`);
    }

    function calculateCoffee(fullDrinkPrice, token) {

        if (token.includes('milk')) {
            let [coinsInserted, coffee, typeOfCoffee, milk, sugarQuantity] = token.split(', ');
            coinsInserted = +coinsInserted;
            sugarQuantity = +sugarQuantity;

            let milkPrice = Number((drinks[typeOfCoffee] * 0.1).toFixed(1));
            let sugarPrice = sugarQuantity > 0 && sugarQuantity <= 5
                ? 0.10
                : 0;

            fullDrinkPrice += drinks[typeOfCoffee] + milkPrice + sugarPrice;

            let change = coinsInserted - fullDrinkPrice;
            let moneyNeeded = fullDrinkPrice - coinsInserted;

            change >= 0
                ? printPositiveResult(coffee, fullDrinkPrice, change)
                : printNegativeResult(coffee, moneyNeeded);

        } else {
            let [coinsInserted, coffee, typeOfCoffee, sugarQuantity] = token.split(', ');
            coinsInserted = +coinsInserted;
            sugarQuantity = +sugarQuantity;

            let sugarPrice = sugarQuantity > 0 && sugarQuantity <= 5
                ? 0.10
                : 0;

            fullDrinkPrice += drinks[typeOfCoffee] + sugarPrice;

            let change = coinsInserted - fullDrinkPrice;
            let moneyNeeded = fullDrinkPrice - coinsInserted;

            change >= 0
                ? printPositiveResult(coffee, fullDrinkPrice, change)
                : printNegativeResult(coffee, moneyNeeded);
        }
    }

    function calculateTea(fullDrinkPrice, token) {

        if (token.includes('milk')) {
            let [coinsInserted, tea, milk, sugarQuantity] = token.split(', ');
            coinsInserted = +coinsInserted;
            sugarQuantity = +sugarQuantity;

            let milkPrice = Number((drinks[tea] * 0.1).toFixed(1));
            let sugarPrice = sugarQuantity > 0 && sugarQuantity <= 5
                ? 0.10
                : 0;

            fullDrinkPrice += drinks[tea] + milkPrice + sugarPrice;

            let change = coinsInserted - fullDrinkPrice;
            let moneyNeeded = fullDrinkPrice - coinsInserted;

            change >= 0
                ? printPositiveResult(tea, fullDrinkPrice, change)
                : printNegativeResult(tea, moneyNeeded);

        } else {
            let [coinsInserted, tea, sugarQuantity] = token.split(', ');
            coinsInserted = +coinsInserted;
            sugarQuantity = +sugarQuantity;

            let sugarPrice = sugarQuantity > 0 && sugarQuantity <= 5
                ? 0.10
                : 0;

            fullDrinkPrice += drinks[tea] + sugarPrice;

            let change = coinsInserted - fullDrinkPrice;
            let moneyNeeded = fullDrinkPrice - coinsInserted;

            change >= 0
                ? printPositiveResult(tea, fullDrinkPrice, change)
                : printNegativeResult(tea, moneyNeeded);
        }
    }

    console.log(`Income Report: ${allMoneyEarned.toFixed(2)}$`);
}

calculateMoney(
    ['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2',
        '1.00, coffee, decaf, 0']);