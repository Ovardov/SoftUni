function calculateMoney(fruitName, weightInGram, pricePerKg) {
    let weightInKg = +weightInGram / 1000;
    pricePerKg = +pricePerKg;
    let money = pricePerKg * weightInKg;

    console.log(`I need ${money.toFixed(2)} leva to buy ${weightInKg.toFixed(2)} kilograms ${fruitName}.`);
}

calculateMoney('orange', 2500, 1.80);