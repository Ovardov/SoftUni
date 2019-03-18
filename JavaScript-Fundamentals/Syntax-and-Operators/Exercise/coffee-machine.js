function calculateMoney(arr) {
    let incomeMoney = 0;

    for (let token of arr) {
        let price = 0;
        let [insertedMoney, drinkType, coffeeType, milk] = token.split(', ');

        let sugar = token[token.length - 1];
        insertedMoney = +insertedMoney;

        if (drinkType === 'coffee') {
            if (coffeeType === 'caffeine') {
                price += 0.80;
            } else if (coffeeType === 'decaf') {
                price += 0.90
            }

            if (milk === 'milk') {
                price += +(price * 0.1).toFixed(1);

                if (sugar > 0) {
                    price += 0.1;
                }
            } else {
                sugar = milk;

                if (sugar > 0) {
                    price += 0.1;
                }
            }
        } else if (drinkType === 'tea') {
            price += 0.80;

            if (coffeeType === 'milk') {
                price += +(price * 0.1).toFixed(1);

                if (sugar > 0) {
                    price += 0.1;
                }
            } else {
                sugar = coffeeType;

                if (sugar > 0) {
                    price += 0.1;
                }
            }
        }

        if (insertedMoney >= price) {
            console.log(`You ordered ${drinkType}. Price: ${price.toFixed(2)}$ Change: ${(insertedMoney - price).toFixed(2)}$`);
            incomeMoney += price;
        } else {
            console.log(`Not enough money for ${drinkType}. Need ${(price - insertedMoney).toFixed(2)}$ more.`);
        }
    }

    console.log(`Income Report: ${incomeMoney.toFixed(2)}$`);
}

calculateMoney(
    [
        '1.00, coffee, caffeine, milk, 4',
        '0.40, tea, milk, 2',
        '1.00, coffee, decaf, 0'
         ]);