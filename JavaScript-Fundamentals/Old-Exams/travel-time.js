function printOffers(arr) {

    let offers = {};

    findOffers(arr);

    let sortByCountry = Object.entries(offers)
        .sort((a, b) => a[0].localeCompare(b[0]));

    for (let [country, townAndPrice] of sortByCountry) {
        let result = `${country} -> `;

        let sortedByTown = Object.entries(townAndPrice)
            .sort((a, b) => a[1] - b[1]);

        for (let [town, price] of sortedByTown) {
            result += `${town} -> ${price} `;
        }

        console.log(result);
    }

    function findOffers(arr) {
        for (let token of arr) {
            let [country, town, price] = token.split(' > ');
            price = +price;
            town = town[0].toUpperCase() + town.substring(1);

            if (offers.hasOwnProperty(country)) {
                if (offers[country].hasOwnProperty(town)) {
                    let oldPrice = offers[country][town];

                    if (oldPrice > price) {
                        offers[country][town] = price;
                    }
                } else {
                    offers[country][town] = price;
                }

            } else {
                offers[country] = {[town]: price};
            }
        }
    }
}

printOffers(
    ["Bulgaria > Sofia > 500",
        "Bulgaria > Sopot > 800",
        "France > Paris > 2000",
        "Albania > Tirana > 1000",
        "Bulgaria > Sofia > 200"]);