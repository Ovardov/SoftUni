const jwt = require('./jwt');
const handleError = require('./handleError')
const { authCookieName } = require('../appConfig');
const { userModel } = require('../models/index');

function auth(isAuth = true) {
    return async function (req, res, next) {
        const token = req.cookies[authCookieName] || '';

        try {
            const data = await jwt.verifyToken(token);
            const user = await userModel.findById(data.id);

            req.user = user;
            next();
        } catch (e) {
            if (!isAuth) {
                next();
                return;
            }

            if (e.message === 'jwt must be provided' || e.message === 'token expired') {
                handleError(res, 'authentication', e.message);
                res.render('users/login');
                return;
            }

            next(e);
        }
    }
}

module.exports = auth;