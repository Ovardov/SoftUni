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
    const { username, password, repeatPassword, amount } = req.body;

    if (password !== repeatPassword) {
        handleError(res, 'repeatPassword', 'Passwords should be same!');
        res.render('users/register', { username, password, repeatPassword, amount });
        return;
    }

    const newUser = {
        username,
        password,
        amount
    };

    return userModel.create(newUser)
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            err.code === 11000 ? handleError(res, 'username', 'Username is already taken!') : handleError(res, err);

            res.render('users/register', { username, password, repeatPassword, amount });
        });
}

function logout(req, res) {
    res.clearCookie(authCookieName).redirect('/');
}

function refill(req, res, next) {
    const user = req.user;
    const { refillAmount } = req.body;

    let currentUserAmount = user.amount;

    let newUserAmount = currentUserAmount + Number(refillAmount);

    userModel.update({ _id: user._id }, { amount: newUserAmount })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            next(err);
        })
}

function getProfile(req, res, next) {
    const userId = req.params.id;

    userModel.findById(userId).populate('expenses')
        .then(user => {
            let totalExpenses = 0;

            user.expenses.forEach(expense => {
                totalExpenses += expense.total;
            })

            user.totalExpenses = totalExpenses;

            let availableAmount = user.amount - totalExpenses;
            user.availableAmount = availableAmount;

            res.render('users/profile', { user })
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
    refill,
    getProfile
}