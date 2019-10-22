const ObjectID = require("mongodb").ObjectID;
const { teamModel, userModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;
    res.render('team/create', { user });
}

function create(req, res, next) {
    const user = req.user;
    const { name } = req.body;

    const newTeam = {
        name
    }

    teamModel.create(newTeam)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            err.code === 11000 ? handleError(res, 'team', 'Team name is already taken!') : handleError(res, err);

            res.render('team/create', { user, team: newTeam });
        })
}

async function getTeams(req, res, next) {
    const user = req.user;
    let { search } = req.query;
    let query = {};

    if (search && user.isUser) {
        query = { name: { $regex: search, $options: 'i' } };
    }

    try {
        const users = await userModel.find({ role: { $ne: 'Admin' } });
        const teams = await teamModel.find(query)
            .populate('members')
            .populate('projects');

        res.render('team/all', { user, users, teams, search });
    } catch (e) {
        next(e);
    }
}

async function distributeTeams(req, res, next) {
    const { team: teamId, user: userId } = req.body;

    try {
        const team = await teamModel.findById(teamId);
        const user = await userModel.findById(userId);
        
        let isExist = team.members.includes(user._id);

        if(isExist) {
            throw new Error(`${user.username} is already exist in ${team.name} team!`);
        } else {
            await teamModel.updateOne({ _id: teamId }, { $push: { members: userId } });
            await userModel.updateOne({ _id: userId }, { $push: { teams: teamId } });
        }

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getCreate,
    create,
    getTeams,
    distributeTeams
}