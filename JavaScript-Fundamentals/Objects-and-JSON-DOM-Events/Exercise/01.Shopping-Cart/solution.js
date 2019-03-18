function solve() {
    let productsElement = document.querySelectorAll('.product');
    let resultElement = document.querySelector('textarea');
    let products = {};

    for (let currentProductElement of productsElement) {
        let button = currentProductElement
            .children[3];
        let name = currentProductElement
            .children[1]
            .textContent;
        let price = Number(currentProductElement
            .children[2]
            .textContent
            .split(' ')[1]);

        button.addEventListener('click', () => {
            if (products.hasOwnProperty(name)) {
                products[name] += price;
            } else {
                products[name] = price;
            }

            resultElement.value += `Added ${name} for ${price.toFixed(2)} to the cart.\n`;
        });
    }

    let buyButton = document.querySelector('#exercise > button');
    buyButton.addEventListener('click', () => {
        let totalPrice = Object.values(products)
            .reduce((a, b) => a + b, 0);

        let allProduct = Object.keys(products);

        resultElement.value += `You bought ${allProduct.join(', ')} for ${totalPrice.toFixed(2)}.\n`;
    });
}