function solve() {
    let [generateButton, buyButton] = document.querySelectorAll('button');
    let [furnitureListTextArea, resultElement] = document.querySelectorAll('textarea');

    let furnitureList = document.getElementById('furniture-list');
    generateButton.addEventListener('click', () => {
        let furniture = JSON.parse(furnitureListTextArea.value)
            .filter(x => x !== '');

        for (let currentFurniture of furniture) {

            let divElement = document.createElement('div');
            divElement.setAttribute('class', 'furniture');

            let pElementName = document.createElement('p');
            pElementName.innerHTML = `Name: ${currentFurniture.name}`;

            let pElementPrice = document.createElement('p');
            pElementPrice.innerHTML = `Price: ${currentFurniture.price}`;

            let pElementDecoration = document.createElement('p');
            pElementDecoration.innerHTML = `Decoration factor: ${currentFurniture.decFactor}`;

            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', currentFurniture.img);

            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'checkbox');


            divElement.appendChild(pElementName);
            divElement.appendChild(imgElement);
            divElement.appendChild(pElementPrice);
            divElement.appendChild(pElementDecoration);
            divElement.appendChild(inputElement);

            furnitureList.appendChild(divElement);
        }
    });


    buyButton.addEventListener('click', () => {
        let allFurniture = Array.from(furnitureList.children);
        let boughtFurniture = [];
        let totalPrice = 0;
        let decFactor = [];

        for (let furniture of allFurniture) {
            let [nameElement, priceElement, decorationFactorElement] = furniture.querySelectorAll('p');

            let productName = nameElement
                .innerHTML
                .split(': ')[1];
            let productPrice = Number(priceElement
                .innerHTML
                .split(': ')[1]);
            let decorationFactor = Number(decorationFactorElement
                .innerHTML
                .split(': ')[1]);
            let isChecked = furniture.querySelector('input').checked;

            if (isChecked) {
                boughtFurniture.push(productName);
                totalPrice += productPrice;
                decFactor.push(decorationFactor);
            }
        }

        let totalDecFactor = decFactor
            .reduce((a, b) => a + b, 0);

        let averageDevFactor = totalDecFactor / decFactor.length;

        resultElement.value += `Bought furniture: ${boughtFurniture.join(', ')}\n`;
        resultElement.value += `Total price: ${totalPrice.toFixed(2)}\n`;
        resultElement.value += `Average decoration factor: ${averageDevFactor}`;

    })
}