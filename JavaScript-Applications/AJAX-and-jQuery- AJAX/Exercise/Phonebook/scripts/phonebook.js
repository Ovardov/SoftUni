function attachEvents() {
    let baseUrl = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    $('#btnLoad').click(loadContacts);
    $('#btnCreate').click(createContact);

    function loadContacts() {
        $.ajax({
            method: 'GET',
            url: baseUrl,
            success: onContactsLoad,
        });
    }

    function onContactsLoad(data) {
        let phoneBook = $('#phonebook');
        phoneBook.empty();

        Object.entries(data).forEach(x => {
            let liElement = $('<li>')
                .text(`${x[1].person}: ${x[1].phone}`);

            let deleteButton = $('<button>')
                .attr('id', x[0])
                .text('Delete')
                .appendTo(liElement);

            deleteButton.click(deleteContact);

            phoneBook.append(liElement);
        });
    }

    function createContact() {
        $.ajax({
            method: 'POST',
            url: baseUrl,
            data: JSON.stringify({
                person: $('#person').val(),
                phone: $('#phone').val()
            }),
            success: function () {
                $('#person').val('');
                $('#phone').val('');

                loadContacts();
            }
        });
    }

    function deleteContact() {
        let key = $(this).attr('id');

        let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;

        $.ajax({
            method: 'DELETE',
            url: deleteUrl,
            success: loadContacts
        })
    }
}
