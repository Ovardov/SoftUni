handlers.getHome = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    if (ctx.isAuth) {

        flightService.getAllFlights()
            .then(function (res) {

                let flights = res;

                flights = flights
                    .map(function (flight) {
                        if (flight.hasOwnProperty('public')) {
                            flight.isChecked = true;
                        }

                        return flight
                    });

                ctx.flights = flights;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'
                })
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    })
                    .catch(function (err) {
                        notifications.handleError(err);
                    });
            });
    } else {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        })
            .then(function () {
                this.partial('./templates/home.hbs');
            })
            .catch(function (err) {
                notifications.handleError(err);
            });
    }
};
