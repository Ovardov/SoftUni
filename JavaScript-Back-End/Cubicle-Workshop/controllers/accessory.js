const {cubeModel, accessoryModel} = require('../models/index');

function getCreate(req, res) {
    res.render('accessories/createAccessory');
}

function createAccessory(req, res, next) {
    const {name, description, imageUrl} = req.body;
    const newAccessory = {
        name,
        description,
        imageUrl,
    };

    accessoryModel.create(newAccessory)
        .then(() => {
            res.redirect('/');
        })
        .catch(next)
}

function getAttachAccessory(req, res, next) {
    const cubeId = req.params.id;

    cubeModel.findById(cubeId)
        .then((cube) => {
            Promise.all([cube, accessoryModel.find({cubes: {$nin: cubeId }})])
                .then(([cube, accessories]) => {
                    res.render('accessories/attachAccessory', {
                        cube,
                        accessories: accessories.length > 0 ? accessories : null
                    });
                });
        })
        .catch(next)
}

function attachAccessory(req, res, next) {
    let cubeId = req.params.id;
    console.log(req.body);
    let accessoryId = req.body.accessory;

    Promise.all([
        cubeModel.update({_id: cubeId}, {$push: {accessories: accessoryId}}),
        accessoryModel.update({_id: accessoryId}, {$push: {cubes: cubeId}})
    ])
        .then(() => {
            res.redirect('/')
        })
        .catch(next);
}

module.exports = {
    getCreate,
    createAccessory,
    getAttachAccessory,
    attachAccessory
};