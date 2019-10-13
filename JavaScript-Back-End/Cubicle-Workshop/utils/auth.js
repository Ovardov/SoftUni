const jwt = require('./jwt');
const { authCookieName } = require('../appConfig');
const { userModel, tokenBlacklistModel } = require('../models/index');

function auth(isAuth = true) {
    return function (req, res, next) {
        const token = req.cookies[authCookieName] || '';
    
        Promise.all([
            jwt.verifyToken(token),
            tokenBlacklistModel.findOne({ token })
        ])
            .then(([data, blacklistedToken]) => {
                if(blacklistedToken) {
                    return Promise.reject(new Error('Blacklisted token'));
                }
    
                userModel.findById(data.id)
                    .then((user) => {
                        req.user = user;
                        next();
                    })
            })
            .catch((err) => {
                if(!isAuth) {
                    next();
                    return;
                }

                if (['jwt must provided', 'Blacklisted token', 'token expired'].includes(err.message)) {
                    res.redirect('/login');
                    return;
                }
    
                next(err);
            })
    }
}

module.exports = auth;