function decodeText(keyword, text) {

    let coordinatePattern = /(north|east)\D*?([0-9]{2})[^,]*?,\D*?([0-9]{6})/gi;


    let northDegrees = '';
    let eastDegrees = '';
    while ((valid = coordinatePattern.exec(text)) !== null) {

        let direction = valid[1];
        if (direction.toLowerCase() === 'north') {
            northDegrees = `${valid[2]}.${valid[3]} N`;
        } else if (direction.toLowerCase() === 'east') {
            eastDegrees = `${valid[2]}.${valid[3]} E`;
        }
    }

    console.log(northDegrees);
    console.log(eastDegrees);

    let message = text.slice(text.indexOf(keyword) + keyword.length, text.lastIndexOf(keyword));
    console.log(`Message: ${message}`);
}

decodeText('&amp', '(&ampThe only time to eat diet food is while you\'re waiting for the steak to cook&amp(east)(23),(234567)\tNORTH\n' +
    '48,(((543678');