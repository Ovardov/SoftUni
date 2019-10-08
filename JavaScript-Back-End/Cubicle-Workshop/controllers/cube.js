const {cubeModel, accessoryModel} = require('../models/index');

function getHome(req, res, next) {
    const {from, to, search} = req.query;
    let query = {};

    if (search) {
        query = {...query, name: {$regex: search}};
    }

    if (from) {
        query = {...query, difficultyLevel: {$gte: +from}};
    }

    if (to) {
        query = {...query, difficultyLevel: {...query.difficultyLevel, $lte: +to}}
    }

    cubeModel.find(query)
        .then((cubes) => {
            res.render('index', {
                cubes,
                search,
                from,
                to
            });
        })
        .catch(next);
}

async function getDetails(req, res, next) {
    const id = req.params.id;

    try {
        const cube = await cubeModel.findById(id).populate('accessories');

        if (!cube) {
            res.redirect('/not-found');
            return;
        }

        res.render('cubes/details', {cube});
    } catch (e) {
        next(e);
    }
}

function getAbout(req, res) {
    res.render('cubes/about');
}

function getCreate(req, res) {
    res.render('cubes/create');
}

function createCube(req, res, next) {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const newCube = {
        name,
        description,
        imageUrl,
        difficultyLevel
    };

    cubeModel.create(newCube)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
}

function getNotFound(req, res) {
    res.render('404');
}

module.exports = {
    getHome,
    getDetails,
    getAbout,
    getCreate,
    createCube,
    getNotFound
};