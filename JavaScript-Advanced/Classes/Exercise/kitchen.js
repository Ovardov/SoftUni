class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(arr) {
        for (let token of arr) {
            let [productName, productQuantity, productPrice] = token.split(' ');
            productQuantity = +productQuantity;
            productPrice = +productPrice;

            if (this.budget >= productPrice) {
                if (this.productsInStock.hasOwnProperty(productName)) {
                    this.productsInStock[productName] += productQuantity;
                } else {
                    this.productsInStock[productName] = productQuantity;
                }

                this.budget -= productPrice;
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`);
            } else {
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`);
            }
        }

        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, products, price) {
        price = +price;

        if (this.menu.hasOwnProperty(meal)) {
            return `The ${meal} is already in our menu, try something different.`;
        } else {
            this.menu[meal] = {products, price};


            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
        }

    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return 'Our menu is not ready yet, please come later...';
        } else {
            let output = '';

            for (let currentMeal of Object.entries(this.menu)) {
                output += `${currentMeal[0]} - $ ${currentMeal[1].price}\n`
            }

            return output;
        }
    }

    makeTheOrder(meal) {
        if (this.menu.hasOwnProperty(meal)) {
            let price = this.menu[meal].price;

            // check if we have all product
            for (let currentNeededProducts of (this.menu[meal].products)) {
                currentNeededProducts = currentNeededProducts.split(' ');
                let productQuantity = +currentNeededProducts.pop();
                let productName = currentNeededProducts.join(' ');

                if (!(this.productsInStock.hasOwnProperty(productName)) || (this.productsInStock[productName] < productQuantity)) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                }
            }

            for (let currentNeededProducts of (this.menu[meal].products)) {
                currentNeededProducts = currentNeededProducts.split(' ');
                let productQuantity = +currentNeededProducts.pop();
                let productName = currentNeededProducts.join(' ');

                this.productsInStock[productName] -= productQuantity;
            }

            this.budget += price;

            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${price}.`;
        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }
    }
}

let test = new Kitchen(1000);

console.log(test.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50', 'Ice 5 10']));
console.log(test.addToMenu("yogurt", ["Banana 10", "Ice 5"], 8.50));
console.log(test.showTheMenu());
console.log(test.makeTheOrder('yogurt'));