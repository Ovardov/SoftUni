function timer() {
    let timer;
    let isTicking = false;

    $('#start-timer').on('click', function () {
        if (isTicking === false) {
            timer = setInterval(startTimer, 1000);
            isTicking = true;
        }
    });

    $('#stop-timer').click(stopTimer);


    function startTimer() {
        let secondsElement = $('#seconds');
        let seconds = +secondsElement.text();

        let minutesElement = $('#minutes');
        let minutes = +minutesElement.text();

        let hoursElement = $('#hours');
        let hours = +hoursElement.text();


        if (seconds === 59) {
            secondsElement.text('00');

            if (minutes === 59) {
                minutesElement.text('00');
                hoursElement.text(formatter(hours + 1));
            } else {
                minutesElement.text(formatter(minutes + 1));
            }
        } else {
            secondsElement.text(formatter(seconds + 1));
        }
    }

    function stopTimer() {
        clearInterval(timer);
        isTicking = false;
    }

    function formatter(element) {
        return `0${element}`.slice(-2);
    }
}