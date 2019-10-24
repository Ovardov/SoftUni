const { userModel } = require('../models/index');
const { jwt, handleError } = require('../utils/index');
const { authCookieName } = require('../appConfig');

function getLogin(req, res) {
    res.render('users/login');
}

async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            handleError(res, 'auth', 'Wrong username or password!');
            res.render('users/login', { username, password });
            return;
        }

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
            handleError(res, 'auth', 'Wrong username or password!');
            res.render('users/login', { username, password });
            return;
        }

        const token = jwt.createToken({ id: user._id });
        res.cookie(authCookieName, token).redirect('/');
    } catch (e) {
        handleError(res, 'auth', 'Wrong username or password!');
        res.render('users/login', { username, password });
    }
}

function getRegister(req, res) {
    res.render('users/register');
}

function register(req, res, next) {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        handleError(res, 'repeatPassword', 'Passwords should be same!');
        res.render('users/register', { username, password, repeatPassword });
        return;
    }

    const newUser = {
        username,
        password
    };

    return userModel.create(newUser)
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            err.code === 11000 ? handleError(res, 'username', 'Username is already taken!') : handleError(res, err);

            res.render('users/register', { username, password, repeatPassword });
        });
}

function logout(req, res) {
    res.clearCookie(authCookieName).redirect('/');
}

module.exports = {
    getLogin,
    login,
    getRegister,
    register,
    logout
}