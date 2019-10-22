const { projectModel, teamModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;
    res.render('project/create', { user });
}

function create(req, res, next) {
    const user = req.user;
    const { name, description } = req.body;

    const newProject = {
        name,
        description
    }

    projectModel.create(newProject)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            err.code === 11000 ? handleError(res, 'project', 'Project name is already taken!') : handleError(res, err);

            res.render('project/create', { user, project: newProject });
        })
}

async function getProjects(req, res, next) {
    const user = req.user;
    let { search } = req.query;
    let query = {};

    if (search && user.isUser) {
        query = { ...query, name: { $regex: search, $options: 'i' } };
    }

    if (user.isAdmin) {
        query = { "team": { "$exists": false } };
    }

    try {
        const teams = await teamModel.find({});
        const projects = await projectModel.find(query).populate('team');

        res.render('project/all', { user, teams, projects, search });
    } catch (e) {
        next(e);
    }
}

async function distributeProjects(req, res, next) {
    const user = req.user;
    const { team: teamId, project: projectId } = req.body;

    try {
        await teamModel.updateOne({ _id: teamId }, { $push: { projects: projectId } });
        await projectModel.updateOne({ _id: projectId }, { team: teamId });

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getCreate,
    create,
    getProjects,
    distributeProjects
}