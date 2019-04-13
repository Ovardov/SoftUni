function makeRealTimeSumPrice() {
    let priceElement = $('#create-entry-form input[name="price"]');
    let quantityElement = $('#create-entry-form input[name="qty"]');


    let quantity = +quantityElement.val();
    let price = +priceElement.val();

    if (quantity > 0) {
        $('#create-entry-form div.col:nth-of-type(4)').text((quantity * price).toFixed(2));
    }
}

function makeRealTimeSumQuantity() {
    let priceElement = $('#create-entry-form input[name="price"]');
    let quantityElement = $('#create-entry-form input[name="qty"]');


    let quantity = +quantityElement.val();
    let price = +priceElement.val();

    if (price > 0) {
        $('#create-entry-form div.col:nth-of-type(4)').text((quantity * price).toFixed(2));
    }
}