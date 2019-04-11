handlers.getAddFlight = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');


    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/flight/addFlight.hbs');
        })
        .catch(function (err) {
            notifications.handleError(err);
        });
};

handlers.addFlight = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');


    let data = {...ctx.params};

    let [departureHours, departureMinutes] = data.departureTime
        .split(':');


    if (typeof data.destination !== 'string' || typeof data.origin !== 'string') {
        notifications.showError('Destination station and origin station should be string')
    } else if (data.destination === '' || data.origin === '') {
        notifications.showError('Destination station and origin station should not be empty string');
    } else if (isNaN(+departureHours) || isNaN(+departureMinutes)) {
        notifications.showError('Departure time should be number');
    } else if (+data.seats < 0 || +data.cost < 0 || data.seats === '' || data.cost === '') {
        notifications.showError('Number of seats and cost per seat should be positive number');
    } else if (!data.img.startsWith('http')) {
        notifications.showError('Image url should start with http');
    } else {

        flightService.createFlight(data)
            .then(function () {

                notifications.showInfo('Created flight.');

                ctx.redirect('#/home')
            })
            .catch(function (error) {
                notifications.handleError(error);
            })
    }
};

handlers.flightInfo = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    flightService.getAFlight(id)
        .then(function (res) {
            let userId = sessionStorage.getItem('id');

            ctx.isCreator = res._acl.creator === userId;
            ctx.destination = res.destination;
            ctx.origin = res.origin;
            ctx.departureDate = res.departureDate;
            ctx.departureTime = res.departureTime;
            ctx.seats = res.seats;
            ctx.cost = res.cost;
            ctx.img = res.img;
            ctx.public = res.public;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/flight/flightDetails.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });

        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.getMyFlights = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    flightService.getAllFlights()
        .then(function (res) {
            let userId = sessionStorage.getItem('id');

            let flights = res;

            flights = flights
                .filter((flight) => flight._acl.creator === userId);

            ctx.flights = flights;


            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/flight/myFlights.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        });
};

handlers.removeFlight = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    flightService.removeFlight(id)
        .then(function () {

            notifications.showInfo('Flight deleted.');

            ctx.redirect('#/myFlights');

        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.getEditFlight = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    flightService.getAFlight(id)
        .then(function (res) {

            ctx.destination = res.destination;
            ctx.origin = res.origin;
            ctx.departureDate = res.departureDate;
            ctx.departureTime = res.departureTime;
            ctx.seats = res.seats;
            ctx.cost = res.cost;
            ctx.img = res.img;
            ctx.public = res.public;

            if (ctx.public === 'on') {
                ctx.isChecked = true;
            } else {
                ctx.isChecked = false;
            }

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/flight/editFlight.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        })
};

handlers.editFlight = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let lastSlashIndex = ctx.app.last_location[1].lastIndexOf('/');
    let id = ctx.app.last_location[1].slice(lastSlashIndex + 1);

    let data = {...ctx.params};

    let [departureHours, departureMinutes] = data.departureTime
        .split(':');


    if (typeof data.destination !== 'string' || typeof data.origin !== 'string') {
        notifications.showError('Destination station and origin station should be string')
    } else if (data.destination === '' || data.origin === '') {
        notifications.showError('Destination station and origin station should not be empty string');
    } else if (isNaN(+departureHours) || isNaN(+departureMinutes)) {
        notifications.showError('Departure time should be number');
    } else if (+data.seats < 0 || +data.cost < 0 || data.seats === '' || data.cost === '') {
        notifications.showError('Number of seats and cost per seat should be positive number');
    } else if (!data.img.startsWith('http')) {
        notifications.showError('Image url should start with http');
    } else {
        flightService.editFlight(id, data)
            .then(function () {

                notifications.showInfo('Successfully edited flight.');

                ctx.redirect(`#/details/${id}`);
            })
            .catch(function (error) {
                notifications.handleError(error);
            })
    }
};