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
    let password = ctx.params.pass;
    let repeatPassword = ctx.params.checkPass;

    if (username.length < 5) {
        notifications.showError('Username should be a string with at least 5 characters long.')
    } else if (password === '' || repeatPassword === '') {
        notifications.showError('Password and repeat password should be at least 1 characer long.');
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
            ctx.redirect('#/login');
        })
};

handlers.loginUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.pass;

    if (username.length < 5) {
        notifications.showError('Username should be a string with at least 5 characters long.')
    } else if (password === '') {
        notifications.showError('Password and repeat password should be at least 1 characer long.');
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