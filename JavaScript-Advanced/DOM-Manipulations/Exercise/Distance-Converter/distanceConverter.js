function attachEventsListeners() {
    let metersStats = {
        'km': 1000,
        'm': 1,
        'cm': 0.01,
        'mm': 0.001,
        'mi': 1609.34,
        'yrd': 0.9144,
        'ft': 0.3048,
        'in': 0.0254
    };

    let convertButton = $('#convert');
    convertButton.on('click', convertDistance);

    function convertDistance() {
        let inputUnits = $('#inputUnits option:selected').val();
        let inputDistance = $('#inputDistance').val();

        let inputUnitsToMeter = metersStats[inputUnits] * inputDistance;

        let outputUnits = $('#outputUnits option:selected').val();
        let outputValue = inputUnitsToMeter / metersStats[outputUnits];

        $('#outputDistance')
            .val(outputValue)
            .prop('disabled', false);

    }
}