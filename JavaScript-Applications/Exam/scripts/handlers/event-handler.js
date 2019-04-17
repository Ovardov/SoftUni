handlers.getCreateEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/event/createEvent.hbs');
        })
        .catch(function (err) {
            notifications.handleError(err);
        });
};

handlers.createEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let data = {...ctx.params, peopleInterestedIn: 0, organizer: ctx.username};

    if (data.name.length < 6) {
        notifications.showError('The event name should be at least 6 characters long.')
    } else if (!data.dateTime.match(/[0-9]+ [A-Za-z\s-]+/)) {
        notifications.showError('The date should be in string format (24 February; 24 March - 10 PM;).')
    } else if (data.description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.')
    } else if (!data.imageURL.startsWith('http://') && !data.imageURL.startsWith('https://')) {
        notifications.showError('The image should start with "http://" or "https://".');
    } else {
        eventService.createEvent(data)
            .then(function () {

                notifications.showInfo('Event created successfully.');

                ctx.redirect('#/home');
            })
            .catch(function (error) {
                notifications.handleError(error);
            })
    }


};

handlers.showMoreInfo = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    eventService.getAnEvent(id)
        .then(function (res) {


            ctx.name = res.name;
            ctx.dateTime = res.dateTime;
            ctx.description = res.description;
            ctx.imageURL = res.imageURL;
            ctx.peopleInterestedIn = res.peopleInterestedIn;
            ctx.organizer = res.organizer;

            ctx.isCreator = res.organizer === ctx.username;
            ctx._id = res._id;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/event/moreDetails.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });

        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.getEdit = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    eventService.getAnEvent(id)
        .then(function (res) {

            ctx.name = res.name;
            ctx.dateTime = res.dateTime;
            ctx.description = res.description;
            ctx.imageURL = res.imageURL;
            ctx.peopleInterestedIn = res.peopleInterestedIn;
            ctx.organizer = res.organizer;

            ctx.isCreator = res.organizer === ctx.username;
            ctx._id = res._id;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/event/editEvent.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });

        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.editEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    let data = {...ctx.params};
    delete data.id;

    if (data.name.length < 6) {
        notifications.showError('The event name should be at least 6 characters long.')
    } else if (!data.dateTime.match(/[0-9]+ [A-Za-z\s-]+/)) {
        notifications.showError('The date should be in string format (24 February; 24 March - 10 PM;).')
    } else if (data.description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.')
    } else if (!data.imageURL.startsWith('http://') && !data.imageURL.startsWith('https://')) {
        notifications.showError('The image should start with "http://" or "https://".');
    } else {
        eventService.editEvent(id, data)
            .then(function () {
                notifications.showInfo('Event edited successfully.');

                ctx.redirect('#/home');
            })
            .catch(function (error) {
                notifications.handleError(error);
            })
    }
};

handlers.closeEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    eventService.deleteEvent(id)
        .then(function () {

            notifications.showInfo('Event closed successfully.');
            ctx.redirect('#/home');
        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.joinEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    eventService.getAnEvent(id)
        .then(function (res) {

            let event = res;

            event.peopleInterestedIn = Number(res.peopleInterestedIn) + 1;

            eventService.editEvent(id, event)
                .then(function () {
                    notifications.showInfo('You join the event successfully.');

                    ctx.redirect('#/home');
                })
                .catch(function (error) {
                    notifications.handleError(error);
                })

        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.getProfile = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let username = ctx.username;

    eventService.getMyEvents(username)
        .then(function (res) {

            ctx.countOfEvents = res.length;

            ctx.events = res;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/profile.hbs');

                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        })
        .catch(function (error) {
            notifications.handleError(error);

        });


};
