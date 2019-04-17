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
    let repeatPassword = ctx.params.rePassword;

    if (username.length < 3) {
        notifications.showError('The username should be at least 3 characters long');
    } else if (password.length < 6 || repeatPassword.length < 6 || password !== repeatPassword) {
        notifications.showError('The password and repeat password should be at least 6 characters long and MUST be same')
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
    let username = ctx.params.username;
    let password = ctx.params.password;

    if (username.length < 3) {
        notifications.showError('The username should be at least 3 characters long');
    } else if (password.length < 6) {
        notifications.showError('The password should be at least 6 characters')
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