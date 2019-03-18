function displayFlightInformation(arr) {
    let [status, town, time, flightNumber, gate] = arr;

    console.log(`${status}: Destination - ${town}, Flight - ${flightNumber}, Time - ${time}, Gate - ${gate}`);
}

displayFlightInformation(['Arrivals', 'Paris', '02:22', 'VD17', '3']);