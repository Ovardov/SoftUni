const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');

module.exports = (app) => {
    // Cubes
    app.get('/details/:id', cubeController.getDetails);
    app.get('/about', cubeController.getAbout);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.createCube);
    app.get('/not-found', cubeController.getNotFound);
    app.get('/', cubeController.getHome);

    // Accessories
    app.get('/create/accessory', accessoryController.getCreate);
    app.post('/create/accessory', accessoryController.createAccessory);
    app.get('/attach/accessory/:id', accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:id', accessoryController.attachAccessory);
};