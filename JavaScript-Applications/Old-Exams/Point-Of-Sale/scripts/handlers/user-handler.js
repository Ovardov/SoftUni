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
    let username = ctx.params['username-register'];
    let password = ctx.params['password-register'];
    let repeatPassword = ctx.params['password-register-check'];

    if (username.length < 5) {
        notifications.showError('Username should be a string with at least 5 characters long.');
    } else if (password === '' || repeatPassword === '') {
        notifications.showError('Password and repeat password should not be a non-empty string.');
    } else if (password !== repeatPassword) {
        notifications.showError('Passwords must match.');
    } else {
        userService.register(username, password)
            .then((res) => {
                userService.saveSession(res);
                notifications.showInfo('User registration successful.');
                ctx.redirect('#/home');
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
            ctx.redirect('#/home');
        })
};

handlers.loginUser = function (ctx) {
    let username = ctx.params['username-login'];
    let password = ctx.params['password-login'];

    if (username.length < 5) {
        notifications.showError('Username should be a string with at least 5 characters long.');
    } else if (password === '') {
        notifications.showError('Password should not be a non-empty string.');
    } else {

        userService.login(username, password)
            .then((res) => {
                userService.saveSession(res);

                notifications.showInfo('Login successful.');
                ctx.redirect('#/home');
            })
            .catch(function (err) {
                notifications.handleError(err);
            });
    }
};