const cubeModel = require('../models/cube');

function getHome(req, res, next) {
    const {from, to, search} = req.query;
    const findCubes = (item) => {
        let result = true;

        if (search) {
            result = item.name
                .toLowerCase()
                .includes(search);
        }

        if (result && from) {
            result = +item.difficultyLevel >= +from;
        }

        if (result && to) {
            result = +item.difficultyLevel <= +to;
        }

        return result;
    };

    cubeModel.find(findCubes)
        .then((cubes) => {
            res.render('index', {cubes, search, from, to});
        })
        .catch(next);
}

function getDetails(req, res, next) {
    const id = +req.params.id;

    cubeModel.getOne(id)
        .then((cube) => {
            if (!cube) {
                res.redirect('/not-found');
                return;
            }

            cube = cube[0];

            res.render('details', {cube});
        })
        .catch(next);
}

function getAbout(req, res) {
    res.render('about');
}

function getCreate(req, res) {
    res.render('create');
}

function createCube(req, res) {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);

    cubeModel.insert(newCube)
        .then(() => {
            res.redirect('/');
        });
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