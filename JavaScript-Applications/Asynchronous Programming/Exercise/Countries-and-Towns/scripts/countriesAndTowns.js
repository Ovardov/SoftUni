function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_B1yjUA1Y4';
    const username = 'guest';
    const password = 'guest';
    const endpointForCountries = 'Country';
    const endpointForTowns = 'Town';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    getCountries();

    let addCountryButton = $('#addCountry button');
    addCountryButton.click(addCountry);

    let addTownButton = $('#addTown button');
    addTownButton.click(addTown);

    async function getCountries() {

        try {
            const data = await $.ajax({
                method: 'GET',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForCountries,
                headers
            });

            showCountries(data);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }

    }

    function showCountries(data) {

        let allCountries = $('#results td').parent();

        for (let country of allCountries) {
            country.remove();
        }

        let sortedByName = data
            .sort((a, b) => a.name.localeCompare(b.name));

        for (let country of sortedByName) {
            let trElement = $('<tr>');
            trElement.append(`<td id="${country._id}">${country.name}</td>`);

            let showTownsButton = $('<button>')
                .text('Show Towns');

            showTownsButton.click(showTowns);

            let editCountryButton = $('<button>')
                .text('Edit Country');

            editCountryButton.click(showCountryOnEditFieldset);

            let deleteCountryButton = $('<button>')
                .text('Delete Country');

            deleteCountryButton.click(deleteCountry);

            trElement.append(showTownsButton);
            trElement.append(editCountryButton);
            trElement.append(deleteCountryButton);

            $('#results').append(trElement);
        }
    }

    async function addCountry() {
        let countryNameElement = $('#countryName');
        let countryName = countryNameElement.val();

        let newCountry = {
            name: countryName
        };

        try {
            await $.ajax({
                method: 'POST',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForCountries,
                headers,
                data: JSON.stringify(newCountry)
            });

            countryNameElement.val('');
            getCountries();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    function showCountryOnEditFieldset() {
        $('#editCountry button').css('display', 'block');

        let trElement = $(this)
            .parent();

        let oldName = $(trElement)
            .find('td')
            .text();

        let oldNameId = $(trElement)
            .find('td')
            .attr('id');

        $('#oldCountryName').val(oldName);

        $('#editCountry button').click(editCountry.bind(this, oldNameId));
    }

    async function editCountry(id) {
        let newNameElement = $('#newCountryName');

        let newName = {
            name: newNameElement.val()
        };

        try {
            await $.ajax({
                method: 'PUT',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForCountries + '/' + id,
                headers,
                data: JSON.stringify(newName)
            });

            $('#editCountry button').css('display', 'none');
            $('#oldCountryName').val('');
            $('#newCountryName').val('');

            getCountries();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }

    }

    async function deleteCountry() {
        let trElement = $(this)
            .parent();

        let id = $(trElement)
            .find('td')
            .attr('id');

        try {
            await $.ajax({
                method: 'DELETE',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForCountries + '/' + id,
                headers,
            });

            getCountries();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    async function showTowns(givenName) {
        let countryName = $(this)
            .parent()
            .find('td')
            .text();

        if (typeof givenName === 'string') {
            countryName = givenName;
        }


        $('.countriesAndTowns').remove();

        try {
            const data = await $.ajax({
                method: 'GET',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForTowns,
                headers
            });

            let clickedCountry = data
                .filter(x => x.country === countryName);

            let div = $('<div>')
                .addClass('countriesAndTowns');

            for (let town of clickedCountry) {
                let p = $(`<p id="${town._id}">${town.country} - ${town.name}</p>`);

                let deleteTownButton = $('<button>')
                    .text('Delete Town');

                deleteTownButton.click(deleteTown);

                p.append(deleteTownButton);

                div.append(p);
            }

            $('body').append(div);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    async function addTown() {
        let townNameElement = $('#townName');
        let countryNameElement = $('#countryForTown');

        let townName = townNameElement.val();
        let countryName = countryNameElement.val();

        let newTown = {
            country: countryName,
            name: townName
        };

        try {
            await $.ajax({
                method: 'POST',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForTowns,
                headers,
                data: JSON.stringify(newTown)
            });

            countryNameElement.val('');
            townNameElement.val('');

            alert('You added town successfully');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    async function deleteTown() {
        let id = $(this)
            .parent()
            .attr('id');

        try {
            await $.ajax({
                method: 'DELETE',
                url: baseUrl + 'appdata/' + appKey + '/' + endpointForTowns + '/' + id,
                headers,
            });

            let country = $(this)
                .parent()
                .text()
                .split(' - ')[0];

            showTowns(country);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
}