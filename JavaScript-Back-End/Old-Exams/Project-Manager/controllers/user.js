const { userModel, teamModel } = require('../models/index');
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
    const { username, password, firstName, lastName, profilePicture } = req.body;

    const newUser = {
        username,
        password,
        firstName,
        lastName,
        profilePicture
    }

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

        res.render('guest/register', { username, password, firstName, lastName, profilePicture });
    }
}

async function getProfile(req, res, next) {
    const user = req.user;
    const id = req.params.id;

    try {
        const user = await userModel.findById(id)
        .populate({ path: 'teams', options: { populate: { path: 'projects' }}});


        res.render('profile', { user });
    } catch (e) {
        next(e);
    }
}

async function leaveTeam(req, res, next) {
    const user = req.user;
    const teamId = req.params.id;

    try {
        await userModel.update({ _id: user._id }, { $pull: { teams: teamId } });
        await teamModel.update({ _id: teamId }, { $pull: { members: user._id } });

        res.redirect(`/profile/${user._id}`);
    } catch (e) {
        next(e);
    }

}

function logout(req, res) {
    res.clearCookie(authCookieName).redirect('/');
}



module.exports = {
    getLogin,
    login,
    getRegister,
    register,
    getProfile,
    leaveTeam,
    logout
}