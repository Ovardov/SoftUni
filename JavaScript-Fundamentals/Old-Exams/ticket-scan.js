function printMessage(encodeText, command) {

    let passengerPattern = /(?<=\s)[A-Z][A-Za-z]*-(([A-Z][A-Za-z]*\.-[A-Z][A-Za-z]*)|([A-Z][A-Za-z]*))(?=\s)/g;
    let name = encodeText
        .match(passengerPattern)[0]
        .split('')
        .map(x => x.replace('-', ' '))
        .join('');


    let airportPattern = /(?<=\s)[A-Z]{3}\/[A-Z]{3}(?=\s)/g;
    let [fromAirport, toAirport] = encodeText
        .match(airportPattern)[0]
        .split('/');

    let flightNumberPattern = /(?<=\s)[A-Z]{1,3}[0-9]{1,5}(?=\s)/g;
    let flightNumber = encodeText.match(flightNumberPattern)[0];

    let companyRegex = /(?<=-\s)[A-Z][A-Za-z]*\*[A-Z][A-Za-z]*(?=\s)/g;
    let company = encodeText
        .match(companyRegex)[0]
        .split('')
        .map(x => x.replace('*', ' '))
        .join('');

    if (command === 'name') {
        console.log(`Mr/Ms, ${name}, have a nice flight!`);
    } else if (command === 'flight') {
        console.log(`Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`);
    } else if (command === 'company') {
        console.log(`Have a nice flight with ${company}.`);
    } else if (command === 'all') {
        console.log(`Mr/Ms, ${name}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${company}.`)
    }
}

printMessage('ahah Second-Testov )*))&&ba SOF/VAR ela** FB973 - Bulgaria*Air -opFB900 pa-SOF/VAr//_- T12G12 STD08:45  STA09:35 ', 'all');