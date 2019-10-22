function permit(...allowed) {

    return function (req, res, next) {
        let user = req.user;

        if (user && isAllowed(...allowed, user.role[0])) {
            next();
        } else {
            res.render('errors/401', { user, errorMessage: 'Unauthorized!' });
            return;
        }
    }
}

function isAllowed(allowed, role) {
    return allowed.indexOf(role) > -1;
}

module.exports = permit;