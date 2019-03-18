let manager = (function () {

    const ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    const recipes = {
        'apple': {
            carbohydrate: 1,
            flavour: 2
        },
        'coke': {
            carbohydrate: 10,
            flavour: 20
        },
        'burger': {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        'omelet': {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        'cheverme': {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    };

    const prepareRecipe = (givenRecipe, neededQuantity) => {
        let neededIngredients = recipes[givenRecipe];

        for (let [ingredient, quantity] of Object.entries(neededIngredients)) {
            let ingredientNeeded = ingredients[ingredient] * neededQuantity;

            if (ingredientNeeded < quantity) {
                return `Error: not enough ${ingredient} in stock`;
            }
        }

        for (let [ingredient, quantity] of Object.entries(neededIngredients)) {
            ingredients[ingredient] -= quantity * neededQuantity;
        }

        return 'Success';
    };


    return function (input) {
        let tokens = input.split(' ');
        let command = tokens[0];

        if (command === 'restock') {
            let microElement = tokens[1];
            let quantity = tokens[2];

            ingredients[microElement] += quantity;
            return 'Success';
        } else if (command === 'prepare') {
            let recipe = tokens[1];
            let neededQuantity = Number(tokens[2]);

            return prepareRecipe(recipe, neededQuantity)
        } else if (command === 'report') {

            return Object.entries(ingredients)
                .map(kvp => `${kvp[0]}=${Number(kvp[1])}`)
                .join(' ')
        }
    }

})();

console.log(manager('restock carbohydrate 10'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare apple 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare burger 1'));
console.log(manager('report'));