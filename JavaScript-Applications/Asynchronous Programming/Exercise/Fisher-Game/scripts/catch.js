function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_SkKlDanOE';
    const endpoint = 'biggestCatches';
    const username = 'ovardov';
    const password = '123456';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    let loadButton = $('.load');
    loadButton.click(loadCatches);

    let addButton = $('.add');
    addButton.click(addCatch);

    async function loadCatches() {
        try {
            let catches = await $.ajax({
                method: 'GET',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint,
                headers
            });

            $('#catches').empty();

            for (let currentCatch of catches) {
                let div = $(`<div class="catch" data-id="${currentCatch._id}">`);

                div
                    .append(`<label>Angler</label>`)
                    .append(`<input type="text" class="angler" value="${currentCatch.angler}"/>`)
                    .append(`<label>Weight</label>`)
                    .append(`<input type="number" class="weight" value="${currentCatch.weight}"/>`)
                    .append(`<label>Species</label>`)
                    .append(`<input type="text" class="species" value="${currentCatch.species}"/>`)
                    .append(`<label>Location</label>`)
                    .append(`<input type="text" class="location" value="${currentCatch.location}"/>`)
                    .append(`<label>Bait</label>`)
                    .append(`<input type="text" class="bait" value="${currentCatch.bait}"/>`)
                    .append(`<label>Capture Time</label>`)
                    .append(`<input type="number" class="captureTime" value="${currentCatch.captureTime}"/>`)

                let updateButton = $('<button class="update">Update</button>');
                updateButton.click(updateCatch);

                let deleteButton = $('<button class="delete">Delete</button>');
                deleteButton.click(deleteCatch);

                div
                    .append(updateButton)
                    .append(deleteButton);

                $('#catches').append(div);
            }

        } catch (error) {
            alert(`Error happened: ${error.statusText}`);
        }

    }

    async function addCatch() {
        let angler = $('#addForm .angler').val();
        let weight = +$('#addForm .weight').val();
        let species = $('#addForm .species').val();
        let location = $('#addForm .location').val();
        let bait = $('#addForm .bait').val();
        let captureTime = +$('#addForm .captureTime').val();

        let catchObject = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        try {
            await $.ajax({
                method: 'POST',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint,
                data: JSON.stringify(catchObject),
                headers
            });

            loadCatches();
        } catch (error) {
            alert(`Error happened: ${error.statusText}`);
        }

        clearFields();
    }

    function clearFields() {
        $('#addForm .angler').val('');
        $('#addForm .weight').val('');
        $('#addForm .species').val('');
        $('#addForm .location').val('');
        $('#addForm .bait').val('');
        $('#addForm .captureTime').val('');
    }

    async function updateCatch() {
        let parent = $(this).parent();

        let clickedCatchId = $(parent)
            .data('id');

        let angler = $(parent)
            .find('input.angler')
            .val();

        let weight = +$(parent)
            .find('input.weight')
            .val();

        let species = $(parent)
            .find('input.species')
            .val();

        let location = $(parent)
            .find('input.location')
            .val();

        let bait = $(parent)
            .find('input.bait')
            .val();

        let captureTime = +$(parent)
            .find('input.captureTime')
            .val();

        let newCatch = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        try {
            await $.ajax({
                method: 'PUT',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint + '/' + clickedCatchId,
                data: JSON.stringify(newCatch),
                headers
            });

        } catch (error) {
            alert(`Error happened: ${error.statusText}`);
        }

        loadCatches();
    }

    async function deleteCatch() {
        let clickedCatchId = $(this)
            .parent()
            .data('id');

        try {
            await $.ajax({
                method: 'DELETE',
                url: baseUrl + 'appdata/' + appKey + '/' + endpoint + '/' + clickedCatchId,
                headers
            });

            loadCatches();
        } catch (error) {
            alert(`Error happened: ${error.statusText}`);
        }
    }
}