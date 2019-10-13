const { cubeModel, accessoryModel, userModel } = require('../models/index');

function getHome(req, res, next) {
    const { from, to, search } = req.query;
    const user = req.user;

    let query = {};

    if (search) {
        query = { ...query, name: { $regex: search } };
    }

    if (from) {
        query = { ...query, difficultyLevel: { $gte: +from } };
    }

    if (to) {
        query = { ...query, difficultyLevel: { ...query.difficultyLevel, $lte: +to } }
    }

    cubeModel.find(query)
        .then((cubes) => {
            res.render('index', {
                cubes,
                search,
                from,
                to,
                user
            });
        })
        .catch(next);
}

async function getDetails(req, res, next) {
    const id = req.params.id;
    const user = req.user;

    let isCreator = false;

    try {
        const cube = await cubeModel.findById(id).populate('accessories');
        const creator = await userModel.findById({ _id: cube.creatorId });

        if (user) {
            isCreator = creator.id === user.id;
        }

        if (!cube) {
            res.redirect('/not-found');
            return;
        }


        res.render('cubes/details', { cube, user, isCreator });
    } catch (e) {
        next(e);
    }
}

function getAbout(req, res) {
    const user = req.user;

    res.render('cubes/about', { user });
}

function getCreate(req, res) {
    const user = req.user;

    res.render('cubes/create', { user });
}

function createCube(req, res, next) {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const user = req.user;

    const newCube = {
        name,
        description,
        imageUrl,
        difficultyLevel,
        creatorId: user._id
    };

    cubeModel.create(newCube)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
}

function getEdit(req, res, next) {
    const id = req.params.id;
    const user = req.user;

    cubeModel.findOne({ _id: id, creatorId: user._id })
        .then((cube) => {
            const options = [
                { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel },
                { title: '2 - Easy', selected: 2 === cube.difficultyLevel },
                { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel },
                { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel },
                { title: '5 - Expert', selected: 5 === cube.difficultyLevel },
                { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel }
            ];

            res.render('cubes/edit', { cube, options, user });
        })
        .catch(next)
}

function editCube(req, res, next) {
    const id = req.params.id;
    let { name, description, imageUrl, difficultyLevel } = req.body;

    difficultyLevel = (Number(difficultyLevel) + 1).toString();

    const newCube = {
        name,
        description,
        imageUrl,
        difficultyLevel,
    };

    cubeModel.updateOne({ _id: id }, newCube)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);

}

function getDelete(req, res, next) {
    const id = req.params.id;
    const user = req.user;

    cubeModel.findOne({ _id: id, creatorId: user._id })
        .then((cube) => {
            const options = [
                { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel },
                { title: '2 - Easy', selected: 2 === cube.difficultyLevel },
                { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel },
                { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel },
                { title: '5 - Expert', selected: 5 === cube.difficultyLevel },
                { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel }
            ];

            res.render('cubes/delete', { cube, options, });
        })
        .catch(next)
}

function deleteCube(req, res, next) {
    const id = req.params.id;
    const user = req.user;

    cubeModel.deleteOne({ _id: id, creatorId: user._id })
        .then((deletedCube) => {
            res.redirect('/');
        })
        .catch(next);
}

function getNotFound(req, res) {
    const user = req.user;

    res.render('404', { user });
}

module.exports = {
    getHome,
    getDetails,
    getAbout,
    getCreate,
    createCube,
    getEdit,
    editCube,
    getDelete,
    deleteCube,
    getNotFound
};