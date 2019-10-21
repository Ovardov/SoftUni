const jwt = require('./jwt');
const handleError = require('./handleError')
const { authCookieName } = require('../appConfig');
const { userModel } = require('../models/index');

function auth(roleCheck = 'guest') {
    return async function (req, res, next) {
        const token = req.cookies[authCookieName] || '';

        try {
            const data = await jwt.verifyToken(token);
            const user = await userModel.findById(data.id);

            if (roleCheck === 'admin' && user.role.includes('Admin')) {
                user.isAdmin = true;
            } else if (roleCheck === 'user' && user.role.includes('Admin')) {
                user.isAdmin = true;
            } else if (roleCheck === 'guest' && user.role.includes('Admin')) {
                user.isAdmin = true;
            } else if (roleCheck === 'user' && user.role.includes('User')) {
                user.isUser = true;
            } else if (roleCheck === 'guest' && user.role.includes('User')) {
                user.isUser = true;
            }

            req.user = user;
            next();
        } catch (e) {
            if (roleCheck === 'guest') {
                next();
                return;
            }

            if (e.message === 'jwt must be provided' || e.message === 'token expired') {
                handleError(res, 'authentication', e.message);
                res.render('guest/login');
                return;
            }

            next(e);
        }
    }
}

module.exports = auth;