class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(inputProducts) {
        for (let currentProduct of inputProducts) {
            let [product, quantity, price] = currentProduct.split(' ');
            quantity = +quantity;
            price = +price;


            if (this.budget >= price) {

                if (this.productsInStock.hasOwnProperty(product)) {
                    let oldQuantity = this.productsInStock[product];
                    this.productsInStock[product] = oldQuantity + quantity;

                } else {
                    this.productsInStock[product] = quantity;
                }

                this.budget -= price;

                this.actionsHistory.push(`Successfully loaded ${quantity} ${product}`);
            } else {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${product}`);
            }
        }

        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, products, price) {
        price = +price;

        if (this.menu.hasOwnProperty(meal)) {
            return `${meal} is already in our menu, try something different.`;
        } else {
            this.menu[meal] = {products, price};

            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
        }
    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return `Our menu is not ready yet, please come later...`;
        } else {
            let result = '';

            Object.entries(this.menu)
                .forEach(x => result += `${x[0]} - $ ${x[1].price}\n`);

            return result
        }

    }

    makeTheOrder(meal) {
        if (this.menu.hasOwnProperty(meal)) {
            let isHaveAllProducts = true;

            let allNeededProduct = this.menu[meal].products;

            for (let currentProduct of allNeededProduct) {
                let nameAndQuantity = currentProduct.split(' ');
                let quantity = +nameAndQuantity.pop();
                let name = nameAndQuantity.join(' ');

                if (!this.productsInStock.hasOwnProperty(name) || this.productsInStock[name] < quantity) {
                    isHaveAllProducts = false;
                }
            }

            if (isHaveAllProducts === true) {

                for (let currentProduct of allNeededProduct) {
                    let nameAndQuantity = currentProduct.split(' ');
                    let quantity = +nameAndQuantity.pop();
                    let name = nameAndQuantity.join(' ');

                    this.productsInStock[name] -= quantity;
                }

                let mealPrice = this.menu[meal].price;
                this.budget += mealPrice;

                return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${mealPrice}.`;
            } else {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }

        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }
    }
}


let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));

console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('frozenYogurt', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));


console.log(kitchen.makeTheOrder('frozenYogurt'));
console.log(kitchen.showTheMenu());