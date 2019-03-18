function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let submitButton = $('#submit');
    submitButton.on('click', submitProduct);

    let productElement = $('.block input:first-of-type');

    productElement.on('change', function () {
        submitButton.prop('disabled', false);
    });

    let priceElement = $('#price');
    let quantityElement = $('#quantity');

    let capacityElement = $('#capacity');
    let sumPriceElement = $('#sum');


    function submitProduct() {
        let product = productElement.val();
        let price = +priceElement.val();
        let quantity = +quantityElement.val();

        let oldCapacity = +capacityElement.val();
        let oldSumPrice = +sumPriceElement.val();

        let li = $('<li>').text(`Product: ${product} Price: ${price} Quantity: ${quantity}`);

        $('.display').append(li);

        capacityElement.val(oldCapacity + quantity);
        sumPriceElement.val(oldSumPrice + price);

        if (+capacityElement.val() === 150) {
            capacityElement
                .addClass('fullCapacity')
                .val('full');

            productElement.prop('disabled', true);
            priceElement.prop('disabled', true);
            quantityElement.prop('disabled', true);
        }


        productElement.val('');
        priceElement.val(1);
        quantityElement.val(1);
        submitButton.prop('disabled', true);
    }
}
