const { userModel } = require('../models/index');
const { jwt, handleError } = require('../utils/index');
const { authCookieName } = require('../appConfig');

function getLogin(req, res) {
    res.render('guest/login');
}

async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            handleError(res, 'auth', 'Wrong username or password!');
            res.render('guest/login', { username, password });
            return;
        }

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
            handleError(res, 'auth', 'Wrong username or password!');
            res.render('guest/login', { username, password });
            return;
        }

        const token = jwt.createToken({ id: user._id });
        res.cookie(authCookieName, token).redirect('/');
    } catch (e) {
        handleError(res, 'auth', 'Wrong username or password!');
        res.render('guest/login', { username, password });
    }
}

function getRegister(req, res) {
    res.render('guest/register');
}

async function register(req, res, next) {
    const { username, password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        handleError(res, 'confirmPassword', 'Passwords should be same!');
        res.render('guest/register', { username, password, confirmPassword, email });
        return;
    }

    const newUser = {
        username,
        password,
        email
    };

    try {
        const users = await userModel.find({});

        if (users.length === 0) {
            newUser.role = 'Admin';
        } else {
            newUser.role = 'User';
        }

        await userModel.create(newUser)

        res.redirect('/login');
    } catch (err) {
        err.code === 11000 ? handleError(res, 'username', 'Username is already taken!') : handleError(res, err);

        res.render('guest/register', { username, password, confirmPassword, email });
    }
}

function logout(req, res) {
    res.clearCookie(authCookieName).redirect('/');
}

function myChannels(req, res, next) {
    const user = req.user;

    userModel.findById(user._id).populate('followedChannels')
        .then(user => {
            res.render('myChannels', { user });
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    getLogin,
    login,
    getRegister,
    register,
    logout,
    myChannels
}