handlers.getHome = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    if (ctx.isAuth) {
        eventService.showAllEvents()
            .then(function (res) {

                ctx.events = res;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'
                })
                    .then(function () {
                        this.partial('templates/home.hbs');
                    })
                    .catch(function (err) {
                        notifications.showError(err);
                    });
            })
            .catch(function (error) {
                notifications.handleError(error);
            });
    } else {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        })
            .then(function () {
                this.partial('templates/home.hbs');
            })
            .catch(function (err) {
                notifications.showError(err);
            });
    }


};