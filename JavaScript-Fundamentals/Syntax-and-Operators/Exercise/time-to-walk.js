function calculateTime(numberOfSteps, footprintLength, speedInKPH) {
    let speedInMPS = speedInKPH / 60 / 60 * 1000;
    let distanceInMeters = numberOfSteps * footprintLength;

    let hours = 0;
    let minutes = 0;
    let seconds = Math.round(distanceInMeters / speedInMPS);
    let rest = Math.floor(distanceInMeters / 500);
    seconds += rest * 60;

    while (seconds >= 60) {
        if (minutes < 60) {
            minutes++;
        } else {
            hours++;
            minutes -= 60;
        }

        seconds -= 60;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (hours < 10) {
        hours = '0' + hours
    }

    console.log(`${hours}:${minutes}:${seconds}`);
}

calculateTime(2564, 0.70, 5.5);