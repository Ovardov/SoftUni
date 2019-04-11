handlers.getRegister = function (ctx) {
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/register.hbs');
        })
        .catch(function (err) {
            notifications.handleError(err);
        });
};

handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/login.hbs');
        })
        .catch(function (err) {
            notifications.handleError(err);
        });
};

handlers.registerUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPassword = ctx.params.repeatPass;


    if (!username.match(/[A-Za-z]{3,}/)) {
        notifications.showError('Username should be at least 3 characters long and should contain only english alphabet letters');
    } else if (!password.match(/[A-Za-z0-9]{6,}/) || !repeatPassword.match(/[A-Za-z0-9]{6,}/)) {
        notifications.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits');
    } else if (password !== repeatPassword) {
        notifications.showError('Passwords must match');
    } else {

        userService.register(username, password)
            .then((res) => {
                userService.saveSession(res);
                notifications.showInfo('User registration successful.');

                ctx.redirect('#/allListings');
            })
            .catch(function (err) {
                notifications.handleError(err);
            });
    }
};

handlers.logoutUser = function (ctx) {
    userService.logout()
        .then(() => {
            sessionStorage.clear();
            notifications.showInfo('Logout successful.');
            ctx.redirect('#/login');
        })
};

handlers.loginUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;

    if (!username.match(/[A-Za-z]{3,}/)) {
        notifications.showError('Username should be at least 3 characters long and should contain only english alphabet letters');
    } else if (!password.match(/[A-Za-z0-9]{6,}/)) {
        notifications.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits');
    } else {
        userService.login(username, password)
            .then((res) => {
                userService.saveSession(res);

                notifications.showInfo('Login successful.');
                ctx.redirect('#/allListings');
            })
            .catch(function (err) {
                notifications.handleError(err);
            });
    }
};