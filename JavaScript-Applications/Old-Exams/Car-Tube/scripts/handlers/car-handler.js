handlers.getAllListings = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    carService.getAllCars()
        .then(function (res) {
            let userId = sessionStorage.getItem('id');

            let cars = res;

            cars.forEach((car) => car.isCreator = car._acl.creator === userId);

            ctx.cars = cars;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/car/carListing.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        });
};

handlers.getCreateListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');


    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/car/createListing.hbs');
        })
        .catch(function (err) {
            notifications.handleError(err);
        });
};

handlers.createListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');


    let data = {...ctx.params};

    data.seller = sessionStorage.getItem('username');


    if (data.title.length > 33 || data.title === '') {
        notifications.showError('The title length must not exceed 33 characters and should be at least 1');
    } else if (data.description.length < 30 || data.description.length > 450) {
        notifications.showError('The description length must not exceed 450 characters and should be at least 30!')
    } else if (data.brand.length > 11 || data.fuel.length > 11 || data.model.length > 11 || data.brand === '' || data.fuel === '' || data.model === '') {
        notifications.showError('The brand, fuel and model length must not exceed 11 characters and should be at least 1');
    } else if (data.model.length < 4) {
        notifications.showError('The model length should be at least 4 characters!')
    } else if (data.year.length !== 4 || data.year === '') {
        notifications.showError('The year must be only 4 chars long!')
    } else if (Number(data.price) > 1000000 || data.price === '') {
        notifications.showError('The maximum price is 1000000$ and should not be empty')
    } else if (!data.imageUrl.startsWith('http')) {
        notifications.showError('Link url should always start with “http”.')
    } else {

        carService.createListing(data)
            .then(function () {
                notifications.showInfo('listing created.');

                ctx.redirect('#/allListings');
            })
            .catch(function (error) {
                notifications.handleError(error);
            });
    }

};

handlers.getEditListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    carService.getACar(id)
        .then(function (res) {

            ctx.title = res.title;
            ctx.description = res.description;
            ctx.brand = res.brand;
            ctx.model = res.model;
            ctx.year = res.year;
            ctx.fuel = res.fuel;
            ctx.imageUrl = res.imageUrl;
            ctx.price = res.price;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/car/editListing.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        });
};

handlers.editListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');


    let id = ctx.params.carId;

    let data = {...ctx.params};

    data.seller = sessionStorage.getItem('username');

    if (data.title.length > 33 || data.title === '') {
        notifications.showError('The title length must not exceed 33 characters and should be at least 1');
    } else if (data.description.length < 30 || data.description.length > 450) {
        notifications.showError('The description length must not exceed 450 characters and should be at least 30!')
    } else if (data.brand.length > 11 || data.fuel.length > 11 || data.model.length > 11 || data.brand === '' || data.fuel === '' || data.model === '') {
        notifications.showError('The brand, fuel and model length must not exceed 11 characters and should be at least 1');
    } else if (data.model.length < 4) {
        notifications.showError('The model length should be at least 4 characters!')
    } else if (data.year.length !== 4 || data.year === '') {
        notifications.showError('The year must be only 4 chars long!')
    } else if (Number(data.price) > 1000000 || data.price === '') {
        notifications.showError('The maximum price is 1000000$ and should not be empty')
    } else if (!data.imageUrl.startsWith('http')) {
        notifications.showError('Link url should always start with “http”.')
    } else {

        carService.editListing(id, data)
            .then(function () {
                notifications.showInfo(`Listing ${data.title} updated.`);

                ctx.redirect('#/allListings');
            })
            .catch(function (error) {
                notifications.handleError(error);
            });
    }
};

handlers.deleteListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    carService.deleteListing(id)
        .then(function () {
            notifications.showInfo('Listing deleted.');

            ctx.redirect('#/allListings');
        })
        .catch(function (error) {
            notifications.handleError(error);
        });
};

handlers.getMyListings = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    carService.getAllCars()
        .then(function (res) {
            let userId = sessionStorage.getItem('id');

            let cars = res;

            cars = cars
                .filter((car) => car._acl.creator === userId);

            ctx.cars = cars;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/car/myListings.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        });
};

handlers.getDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    carService.getACar(id)
        .then(function (res) {
            ctx.title = res.title;
            ctx.description = res.description;
            ctx.brand = res.brand;
            ctx.model = res.model;
            ctx.year = res.year;
            ctx.fuel = res.fuel;
            ctx.imageUrl = res.imageUrl;
            ctx.price = res.price;

            ctx.isCreator = res.seller === ctx.username;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/car/listingDetails.hbs');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                });
        });
};