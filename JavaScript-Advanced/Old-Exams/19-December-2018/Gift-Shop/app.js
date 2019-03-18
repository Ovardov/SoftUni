function solution() {
    let toyType = $('#toyType').val();
    let toyPrice = $('#toyPrice').val();
    let toyDescription = $('#toyDescription').val();


    if (toyType && +toyPrice && toyDescription) {
        createGiftAndAppend(toyType, toyPrice, toyDescription);
    }

    removeOldValues();


    let buyButtons = $('#christmasGiftShop button');
    buyButtons.click(removeGift);


    function createGiftAndAppend(toyType, toyPrice, toyDescription) {
        let divElement = $('<div>').addClass('gift');

        let imgElement = $('<img>')
            .attr('src', 'gift.png')
            .appendTo(divElement);

        let h2Element = $('<h2>')
            .text(toyType)
            .appendTo(divElement);

        let pElement = $('<p>')
            .text(toyDescription)
            .appendTo(divElement);

        let buyButton = $('<button>')
            .text(`Buy it for $${toyPrice}`)
            .appendTo(divElement);

        divElement.appendTo($('#christmasGiftShop'));
    }

    function removeOldValues() {
        $('#toyType').val('');
        $('#toyPrice').val('');
        $('#toyDescription').val('');
    }

    function removeGift() {
        $(this).parent().remove();
    }
}