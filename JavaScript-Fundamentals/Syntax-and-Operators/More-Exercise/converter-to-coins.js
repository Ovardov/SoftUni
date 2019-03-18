function convertIntoCoins(givenNumber, coins) {
    let allCoins = [];

    coins = coins
        .sort((a, b) => b - a);

    for (let i = 0; i < coins.length; i++) {
        let currentCoin = coins[i];
        while (givenNumber - currentCoin >= 0) {
            allCoins.push(currentCoin);
            givenNumber -= currentCoin;
        }
    }

    console.log(allCoins.join(', '));
}

convertIntoCoins(46, [10, 25, 5, 1, 2]);