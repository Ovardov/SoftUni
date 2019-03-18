function attachEventsListeners() {

    let secondsStats = {
        'days': 86400,
        'hours': 3600,
        'minutes': 60,
        'seconds': 1,
    };

    let convertButtons = $('input[type=button]');
    convertButtons.on('click', convertValues);

    function convertValues(e) {

        let allInputElements = $('input[type=text]');

        for (let element of allInputElements) {
            let inputValue = element.value;

            if (inputValue !== '') {
                let elementId = element.id;

                let totalSeconds = secondsStats[elementId] * inputValue;

                $('#days').val(totalSeconds / secondsStats['days']);
                $('#hours').val(totalSeconds / secondsStats['hours']);
                $('#minutes').val(totalSeconds / secondsStats['minutes']);
                $('#seconds').val(totalSeconds / secondsStats['seconds']);

                return;
            }
        }
    }
}
