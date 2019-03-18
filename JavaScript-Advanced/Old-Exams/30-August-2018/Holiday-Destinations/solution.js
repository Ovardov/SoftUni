function addDestination() {
    let cityElement = $('#input input:first-of-type');
    let countryElement = $('#input input:last-of-type');

    let city = cityElement.val();
    let country = countryElement.val();
    let season = $('#seasons option:selected').text();

    if (city && country) {
        let tr = $('<tr>');

        let tdForCountryAndCity = $('<td>')
            .text(`${city}, ${country}`)
            .appendTo(tr);

        let tdForSeason = $('<td>')
            .text(season)
            .appendTo(tr);

        $('#destinations').append(tr);

        let oldValue = +$(`#${season.toLowerCase()}`).val();

        $(`#${season.toLowerCase()}`).val(oldValue + 1);
    }

    cityElement.val('');
    countryElement.val('');
    $('#seasons option[value="summer"]').prop('selected', true);
}