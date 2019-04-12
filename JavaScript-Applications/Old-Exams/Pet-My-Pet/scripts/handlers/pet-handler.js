handlers.getCreatePet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {

            this.partial('./templates/pet/createPet.hbs')
        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.createPet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let data = {...ctx.params, likes: 0};

    if (data.name === '' || data.description === '') {
        notifications.showError('All fields should be non-empty');
    } else if (!data.imageURL.startsWith('http')) {
        notifications.showError('Image url should start with http');
    } else {

        petService.createPet(data)
            .then(function () {

                notifications.showInfo('Pet created.');

                ctx.redirect('#/home');

            })
            .catch(function (error) {
                notifications.handleError(error);
            })
    }
};

handlers.getDashboard = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let filter = ctx.params.category.slice(1);

    petService.getAllPets(filter)
        .then(function (res) {
            let userId = sessionStorage.getItem('id');

            let pets = res;

            pets.forEach((pet) => pet.isCreator = pet._acl.creator === userId);

            ctx.pets = pets;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {

                    this.partial('./templates/pet/dashboard.hbs')

                })
                .catch(function (error) {
                    notifications.handleError(error);
                })
        })
};

handlers.getMyPets = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let userId = sessionStorage.getItem('id');


    petService.getMyPets(userId)
        .then(function (res) {

            ctx.myPets = res;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {

                    this.partial('./templates/pet/myPets.hbs')

                })
                .catch(function (error) {
                    notifications.handleError(error);
                })
        })
};

handlers.deletePet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    petService.deletePet(id)
        .then(function () {

            notifications.showInfo('Pet removed successfully!');

            ctx.redirect('#/home');
        })
        .catch(function (error) {
            notifications.handleError(error);
        })

};

handlers.getPetDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    petService.getPetDetails(id)
        .then(function (res) {
            let userId = sessionStorage.getItem('id');

            ctx.name = res.name;
            ctx.description = res.description;
            ctx.imageURL = res.imageURL;
            ctx.likes = res.likes;

            ctx.isCreator = res._acl.creator === userId;
            ctx.id = id;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {

                    this.partial('./templates/pet/petDetails.hbs');
                })
                .catch(function (error) {
                    notifications.handleError(error);
                })
        })
        .catch(function (error) {
            notifications.handleError(error);
        })
};

handlers.editPetInfo = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    petService.getPetDetails(id)
        .then(function (res) {
            let data = {...res};

            data.description = ctx.params.description;

            petService.editPet(id, data)
                .then(function () {
                    notifications.showInfo('Updated successfully!');

                    ctx.redirect('#/dashboard');
                })
                .catch(function (error) {
                    notifications.handleError(error);
                })
        });
};

handlers.likePet = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let id = ctx.params.id;

    petService.getPetDetails(id)
        .then(function (res) {
            let pet = res;

            let newLikes = Number(pet.likes) + 1;
            pet.likes = newLikes;

            petService.likePet(id, pet)
                .then(function () {
                    notifications.showInfo('Liked');

                    ctx.redirect('#/dashboard');
                })
                .catch(function (error) {
                    notifications.handleError(error);
                })
        });
};