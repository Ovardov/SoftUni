function acceptance() {
    let shippingCompanyElement = $('#fields input[name=shippingCompany]');
    let productNameElement = $('#fields input[name=productName]');
    let productQuantityElement = $('#fields input[name=productQuantity]');
    let productScrapeElement = $('#fields input[name=productScrape]');

    let company = shippingCompanyElement.val();
    let product = productNameElement.val();

    let quantity = +productQuantityElement.val();
    let scrape = +productScrapeElement.val();

    if (company && product && quantity > 0 && scrape >= 0) {

        if (quantity > scrape) {

            let div = $('<div>');
            let p = $('<p>')
                .text(`[${company}] ${product} - ${quantity - scrape} pieces`);

            let outOfStockButton = $('<button>')
                .text('Out of stock');

            outOfStockButton.on('click', removeProduct);

            div
                .append(p)
                .append(outOfStockButton);

            $('#warehouse').append(div);
        }
    }

    shippingCompanyElement.val('');
    productNameElement.val('');
    productQuantityElement.val('');
    productScrapeElement.val('');

    function removeProduct(e) {
        let element = $(e.target);
        let parent = element.parent();

        parent.remove();
    }
}

