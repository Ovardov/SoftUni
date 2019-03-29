function solve() {
    let currentStop = 'depot';
    let info = $('span.info');

    function depart() {

        $.ajax({
            method: 'GET',
            url: `https://judgetests.firebaseio.com/schedule/${currentStop}.json `,
            success: loadStop,
            error: displayError
        });
    }

    function loadStop(data) {
        currentStop = data;

        info.text(`Next stop ${currentStop.name}`);

        switchButtons('depart', 'arrive');
    }

    function switchButtons(disable, enable) {
        $(`#${disable}`).attr('disabled', true);
        $(`#${enable}`).attr('disabled', false);
    }

    function arrive() {
        info.text(`Arriving at ${currentStop.name}`);
        currentStop = currentStop.next;

        switchButtons('arrive', 'depart');
    }


    function displayError() {
        info.text('Error');

        $('#depart').attr('disabled', true);
        $('#arrive').attr('disabled', true);
    }

    return {
        depart,
        arrive
    };
}