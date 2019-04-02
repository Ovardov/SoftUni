function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com/';

    let getWeatherButton = $('#submit');
    getWeatherButton.click(getWeather);

    async function getWeather() {
        try {

            let weather = await $.ajax({
                method: 'GET',
                url: baseUrl + 'locations.json'
            });

            let location = $('#location').val();

            let locationCode = weather
                .filter(x => x.name === location)[0].code;

            let locationTodayWeather = await $.ajax({
                method: 'GET',
                url: baseUrl + `forecast/today/${locationCode}.json`
            });

            let locationUpcomingWeather = await $.ajax({
                method: 'GET',
                url: baseUrl + `forecast/upcoming/${locationCode}.json`
            });


            $('#forecast').css('display', 'block');

            displayTodayWeather(locationTodayWeather);
            displayUpcomingWeather(locationUpcomingWeather);

        } catch (error) {
            $('#forecast')
                .css('display', 'block')
                .text('Error');
        }
    }

    function displayTodayWeather(locationWeatherToday) {
        let currentWeatherElement = $('#current');

        let locationName = locationWeatherToday.name;
        let condition = locationWeatherToday.forecast.condition;
        let high = locationWeatherToday.forecast.high;
        let low = locationWeatherToday.forecast.low;


        let [symbolForWeather, degreesSymbol] = getSymbol(condition);

        let spanForSymbol = $('<span>')
            .addClass('condition symbol')
            .html(symbolForWeather);

        let spanForWeather = $('<span>')
            .addClass('condition')
            .append(`<span class="forecast-data">${locationName}</span>`)
            .append(`<span class="forecast-data">${low}${degreesSymbol}/${high}${degreesSymbol}</span>`)
            .append(`<span class="forecast-data">${condition}</span>`);

        currentWeatherElement
            .append(spanForSymbol)
            .append(spanForWeather);

    }

    function displayUpcomingWeather(locationUpcomingWeather) {
        let upcomingWeatherElement = $('#upcoming');

        let forecast = locationUpcomingWeather.forecast;

        for (let currentDay of forecast) {

            let condition = currentDay.condition;
            let high = currentDay.high;
            let low = currentDay.low;

            let [symbolForWeather, degreesSymbol] = getSymbol(condition);

            let spanForWeather = $('<span>')
                .addClass('upcoming')
                .append(`<span class="symbol">${symbolForWeather}</span>`)
                .append(`<span class="forecast-data">${low}${degreesSymbol}/${high}${degreesSymbol}</span>`)
                .append(`<span class="forecast-data">${condition}</span>`);

            upcomingWeatherElement.append(spanForWeather);
        }
    }

    function getSymbol(condition) {
        const allSymbols = {
            'Sunny': '&#x2600',
            'Partly sunny': '&#x26C5',
            'Overcast': '&#x2601',
            'Rain': '&#x2614',
            'Degrees': '&#176'
        };

        return [allSymbols[condition], allSymbols['Degrees']];
    }
}