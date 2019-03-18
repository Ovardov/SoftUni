function solve(arr) {

    let atmMoney = 0;
    let atmBanknotes = [];
    for (let token of arr) {

        if (token.length > 2) {
            insertMoneyInATM(token);
        } else if (token.length === 2) {
            withdrawMoney(token);
        } else if (token.length === 1) {
            report(token);
        }
    }

    function insertMoneyInATM(token) {
        token.forEach(x => atmBanknotes.push(x));

        let insertedCash = token
            .reduce((a, b) => a + b, 0);

        atmMoney += insertedCash;

        console.log(`Service Report: ${insertedCash}$ inserted. Current balance: ${atmMoney}$.`);
    }

    function withdrawMoney(token) {
        let [accountBalance, moneyToWithdraw] = token;

        if (accountBalance < moneyToWithdraw) {
            console.log(`Not enough money in your account. Account balance: ${accountBalance}$.`);
        } else if (moneyToWithdraw > atmMoney) {
            console.log(`ATM machine is out of order!`);
        } else {
            let sorted = atmBanknotes
                .sort((a, b) => b - a);

            let withdrawMoneyForResult = moneyToWithdraw;

            while (moneyToWithdraw > 0) {
                for (let i = 0; i < sorted.length; i++) {
                    let currentBanknote = sorted[i];

                    if (moneyToWithdraw >= currentBanknote) {
                        moneyToWithdraw -= currentBanknote;
                        sorted.splice(i, 1);
                        atmMoney -= currentBanknote;
                        accountBalance -= currentBanknote;
                    }
                }
            }

            console.log(`You get ${withdrawMoneyForResult}$. Account balance: ${accountBalance}$. Thank you!`)
        }
    }

    function report(token) {
        let banknoteToFind = token[0];

        let findBanknotes = atmBanknotes
            .filter(f => f === banknoteToFind);

        console.log(`Service Report: Banknotes from ${banknoteToFind}$: ${findBanknotes.length}.`);
    }
}

solve(
    [
            [20, 5, 100, 20, 1],
            [457, 25],
            [1],
            [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
            [20, 85],
            [5000, 4500],
        ]);