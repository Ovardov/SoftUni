function getInfo() {
    let stopIdElement = $('#stopId');
    let stopId = stopIdElement.val();

    $('#stopName').text('');
    $('#buses').empty();

    $.ajax({
        method: 'GET',
        url: `https://judgetests.firebaseio.com/businfo/${stopId}.json`,
        success: displayData,
        error: displayError
    });

    function displayData(data) {
        stopIdElement.val('');

        let stopName = data.name;
        $('#stopName').text(stopName);

        for (let [busNumber, time] of Object.entries(data.buses)) {
            let liElement = $('<li>')
                .text(`Bus ${busNumber} arrives in ${time} minutes`);

            $('#buses').append(liElement);
        }

    }

    function displayError() {
        $('#stopName').text('Error');
    }
}