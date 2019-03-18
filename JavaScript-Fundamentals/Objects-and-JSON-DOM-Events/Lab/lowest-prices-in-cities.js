function trackingLowestPrice(arr) {
    let store = {};

    for (let token of arr) {
        let [townName, product, productPrice] = token.split(' | ');
        productPrice = +productPrice;

        if (store.hasOwnProperty(product)) {
            if (store[product].town.includes(townName)) {
                let oldPriceIndex = store[product].town.indexOf(townName);
                store[product].price[oldPriceIndex] = productPrice;

            } else {
                store[product].price.push(productPrice);
                store[product].town.push(townName);
            }

        } else {
            store[product] = {'price': [productPrice], 'town': [townName]}
        }
    }

    for (let [product, priceAndTown] of Object.entries(store)) {
        let allPrices = priceAndTown.price;
        let lowestPrice = +Infinity;
        let lowestPriceIndex = 0;

        for (let i = 0; i < allPrices.length; i++) {
            if (allPrices[i] < lowestPrice) {
                lowestPrice = allPrices[i];
                lowestPriceIndex = i;
            }
        }

        console.log(`${product} -> ${lowestPrice} (${priceAndTown.town[lowestPriceIndex]})`);
    }
}

trackingLowestPrice(
    ['Sofia City | Audi | 100000',
        'Sofia City | BMW | 100000',
        'Sofia City | Mitsubishi | 10000',
        'Sofia City | Mercedes | 10000',
        'Sofia City | NoOffenseToCarLovers | 0',
        'Mexico City | Audi | 1000',
        'Mexico City | BMW | 99999',
        'New York City | Mitsubishi | 10000',
        'New York City | Mitsubishi | 1000',
        'Mexico City | Audi | 100000',
        'Washington City | Mercedes | 1000']);