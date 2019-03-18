function solve() {

    let storage = {};
    let loadProduct = document.getElementsByTagName('textarea')[2];

    let loadButton = document.getElementsByTagName('button')[0];
    loadButton.addEventListener('click', add);

    let buyButton = document.getElementsByTagName('button')[1];
    buyButton.addEventListener('click', buy);

    let endDayButton = document.getElementsByTagName('button')[2];
    endDayButton.addEventListener('click', endDay);

    function add() {
        let inputArray = JSON.parse(document.getElementsByTagName('textarea')[0].value);

        for (let currentProduct of inputArray) {
            if (storage.hasOwnProperty(currentProduct.name)) {
                storage[currentProduct.name].price = currentProduct.price;
                storage[currentProduct.name].quantity += currentProduct.quantity;

            } else {
                storage[currentProduct.name] = {price: currentProduct.price, quantity: currentProduct.quantity};
            }

            loadProduct.value += `Successfully added ${currentProduct.quantity} ${currentProduct.name}. Price: ${currentProduct.price}\n`;
        }
    }

    let profit = 0;

    function buy() {
        let inputProduct = JSON.parse(document.getElementsByTagName('textarea')[1].value);

        if (storage.hasOwnProperty(inputProduct.name) && storage[inputProduct.name].quantity >= inputProduct.quantity) {
            let soldPrice = storage[inputProduct.name].price * inputProduct.quantity;
            profit += soldPrice;
            loadProduct.value += `${inputProduct.quantity} ${inputProduct.name} sold for ${soldPrice}.\n`;

            storage[inputProduct.name].quantity -= inputProduct.quantity;
        } else {
            loadProduct.value += 'Cannot complete order.\n'
        }
    }

    function endDay() {
        loadProduct.value += `Profit: ${profit.toFixed(2)}.\n`;
        loadButton.removeEventListener('click', add);
        buyButton.removeEventListener('click', buy);
        endDayButton.removeEventListener('click', endDay);
    }
}