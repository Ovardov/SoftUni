function initializeTable() {
    let createButton = $('#createLink').click(addCountry);

    function addCountry() {
        let inputCountry = $('#newCountryText').val();
        let inputCapital = $('#newCapitalText').val();

        if (inputCountry !== '' && inputCapital !== '') {
            createCountry(inputCountry, inputCapital);
        }
    }

    function createCountry(country, capital) {
        let table = $('#countriesTable');

        let rowElement = $('<tr>');

        let countryAndCapital =
            $(`<td>${capital}</td>
                    <td>${country}</td>`);

        let actions = $('<td>')
            .append($('<a href="#">[Up]</a>').click(moveUp))
            .append($('<a href="#">[Down]</a>').click(moveDown))
            .append($('<a href="#">[Delete]</a>').click(deleteElement));

        rowElement.append(countryAndCapital, actions);

        table.append(rowElement);
        fixLinks();

    }

    function moveUp() {
        let currentRow = $(this).parent().parent();
        let previousRow = currentRow.prev();

        currentRow.insertBefore(previousRow);
        fixLinks();
    }

    function moveDown() {
        let currentRow = $(this).parent().parent();
        let nextRow = currentRow.next();

        currentRow.insertAfter(nextRow);
        fixLinks();
    }

    function deleteElement() {
        let currentRow = $(this).parent().parent();

        currentRow.remove();
        fixLinks();
    }

    function fixLinks() {
        $('a').show();

        let firstRowWithUpAction = $('#countriesTable tr:nth-child(3) td:nth-child(3) a:first-child');
        firstRowWithUpAction.hide();

        let lastRowWithDownAction = $('#countriesTable tr:last-child td:nth-child(3) a:nth-child(2)');
        lastRowWithDownAction.hide();
    }

    createCountry('Bulgaria', 'Sofia');
    createCountry('Germany', 'Berlin');
    createCountry('Russia', 'Moscow');
}