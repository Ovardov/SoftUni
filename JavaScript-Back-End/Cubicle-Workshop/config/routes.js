const cubeController = require('../controllers/cube');

module.exports = (app) => {
    app.get('/details/:id', cubeController.getDetails);
    app.get('/about', cubeController.getAbout);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.createCube);
    app.get('/not-found', cubeController.getNotFound);
    app.get('/', cubeController.getHome);
};