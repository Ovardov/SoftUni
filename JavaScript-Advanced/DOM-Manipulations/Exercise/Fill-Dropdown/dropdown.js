function addItem() {
    let menu = $('#menu');

    let newItemText = $('#newItemText');
    let newItemValue = $('#newItemValue');

    $('<option>')
        .text(newItemText.val())
        .val(newItemValue.val())
        .appendTo(menu);

    newItemText.val('');
    newItemValue.val('');
}