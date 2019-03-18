function trackingSales(arr) {
    let store = {};

    for (let token of arr) {
        let [townName, product, salesWithPrice] = token.split(' -> ');
        let [sales, priceForOne] = salesWithPrice.split(' : ');
        sales = +sales;
        priceForOne = +priceForOne;

        let totalIncome = sales * priceForOne;

        if (store.hasOwnProperty(townName)) {
            if (store[townName].hasOwnProperty(product)) {
                store[townName][product] += totalIncome;
            } else {
                store[townName][product] = totalIncome;
            }
        } else {
            store[townName] = {[product]: totalIncome};
        }
    }

    for (let [town, sales] of Object.entries(store)) {
        console.log(`Town - ${town}`);

        for (let [product, income] of Object.entries(sales)) {
            console.log(`$$$${product} : ${income}`);
        }
    }
}

trackingSales(
    ['Sofia -> Laptops HP -> 200 : 2000',
        'Sofia -> Raspberry -> 200000 : 1500',
        'Sofia -> Audi Q7 -> 200 : 100000',
        'Montana -> Portokals -> 200000 : 1',
        'Montana -> Qgodas -> 20000 : 0.2',
        'Montana -> Chereshas -> 1000 : 0.3']);