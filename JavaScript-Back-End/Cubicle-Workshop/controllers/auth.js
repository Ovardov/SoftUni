const { userModel, tokenBlacklistModel } = require('../models/index');
const { jwt, auth } = require('../utils/index');
const { authCookieName } = require('../appConfig');

function getLogin(req, res) {
    res.render('users/login');
}

function login(req, res, next) {
    const { username, password } = req.body;

    userModel.findOne({ username })
        .then((user) => {
            if (!user) {
                res.render('500', { errorMessage: 'Wrong password or username' });
                return;
            }

            return Promise.all([user, user.matchPassword(password)])
        })
        .then(([user, match]) => {
            if (!match) {
                res.render('500', { errorMessage: 'Wrong password or username' });
                return;
            }

            const token = jwt.createToken({ id: user._id });

            res.cookie(authCookieName, token).redirect('/');
        })
        .catch((err) => {
            console.error(err);
        })
}

function getRegister(req, res) {
    res.render('users/register');
}

function register(req, res, next) {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('users/register', {
            errors: {
                repeatPassword: 'Password and repeat password don\'t match!'
            }
        });
    }

    const newUser = {
        username,
        password
    };

    return userModel.create(newUser)
        .then(() => {
            res.redirect('/login');
        })
        .catch((err) => {
            if (err.name === 'MongoError' && err.code == 11000) {
                res.render('users/register', {
                    errors: {
                        username: 'Username already taken!'
                    }
                });

                return;
            }

            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[authCookieName];
   
    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName).redirect('/');
        })
}

module.exports = {
    getLogin,
    login,
    getRegister,
    register,
    logout
}