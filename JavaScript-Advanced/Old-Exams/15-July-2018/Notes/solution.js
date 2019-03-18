function addSticker() {
    let titleElement = $('.title');
    let textElement = $('.content');

    let title = titleElement.val();
    let text = textElement.val();

    if (title && text) {
        let li = $('<li>')
            .addClass('note-content');

        let removeButton = $('<a>')
            .addClass('button')
            .text('x')
            .appendTo(li);

        removeButton.on('click', removeElement);

        $('<h2>')
            .text(title)
            .appendTo(li);

        $('<hr>').appendTo(li);

        $('<p>')
            .text(text)
            .appendTo(li);

        $('#sticker-list').append(li);
    }

    titleElement.val('');
    textElement.val('');

    function removeElement(e) {
        let parent = $(e.target).parent();
        parent.remove();
    }
}