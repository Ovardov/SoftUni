function solve() {
    let inputText = document.getElementById('str').value;
    let [text, command] = inputText.split(', ');
    let resultElement = document.getElementById('result');

    let passengerPattern = /(?<=\s)[A-Z][A-Za-z]*-(([A-Z][A-Za-z]*\.-[A-Z][a-zA-Z]*)|([A-Z][A-Za-z]*))(?=\s)/g;
    let airportPattern = /(?<=\s)[A-Z]{3}\/[A-Z]{3}(?=\s)/g;
    let flightPattern = /(?<=\s)[A-Z]{1,3}[0-9]{1,5}(?=\s)/g;
    let companyPattern = /(?<=-\s)[A-Z][A-Za-z]*\*[A-Z][A-Za-z]*(?=\s)/g;

    let passengerName = text
        .match(passengerPattern)[0]
        .split('')
        .map(x => x.replace('-', ' '))
        .join('');

    let [fromAirport, toAirport] = text
        .match(airportPattern)[0]
        .split('/');

    let flightNumber = text.match(flightPattern);

    let company = text
        .match(companyPattern)[0]
        .split(' ')
        .map(x => x.replace('*', ' '))
        .join('');


    if (passengerName !== null && fromAirport !== null && toAirport !== null && flightNumber !== null && company !== null) {

        if (command === 'all') {
            resultElement.textContent = `Mr/Ms, ${passengerName}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${company}.`;
        } else if (command === 'name') {
            resultElement.textContent = `Mr/Ms, ${passengerName}, have a nice flight!`;
        } else if (command === 'flight') {
            resultElement.textContent = `Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`;
        } else if (command === 'company') {
            resultElement.textContent = `Have a nice flight with ${company}.`;
        }
    }
}