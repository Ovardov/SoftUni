function increment(selector) {
    let textAreaElement = $('<textarea>');
    textAreaElement
        .addClass('counter')
        .val(0)
        .prop('disabled', 'true')
        .appendTo(selector);

    let incrementButtonElement = $('<button>');
    incrementButtonElement
        .addClass('btn')
        .attr('id', 'incrementBtn')
        .text('Increment')
        .appendTo(selector)
        .click(incrementCounter);

    let addButtonElement = $('<button>');
    addButtonElement
        .addClass('btn')
        .attr('id', 'addBtn')
        .text('Add')
        .appendTo(selector)
        .click(addListItem);

    let ulElement = $('<ul>');
    ulElement
        .addClass('results')
        .appendTo(selector);


    function incrementCounter() {
        let oldValue = Number(textAreaElement.val());

        textAreaElement.val(oldValue + 1)
    }

    function addListItem() {
        let textAreaValue = textAreaElement.val();
        let liElement = $('<li>');

        liElement
            .text(textAreaValue)
            .appendTo(ulElement);
    }
}
