const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const { auth } = require('../utils/index');

module.exports = (app) => {
    // Cubes
    app.get('/details/:id', auth(false), cubeController.getDetails);
    app.get('/about', auth(false), cubeController.getAbout);
    app.get('/create', auth(), cubeController.getCreate);
    app.post('/create', auth(), cubeController.createCube);
    app.get('/not-found', auth(false), cubeController.getNotFound);
    app.get('/edit/:id', auth(), cubeController.getEdit);
    app.post('/edit/:id', auth(), cubeController.editCube);
    app.get('/delete/:id', auth(), cubeController.getDelete);
    app.post('/delete/:id', auth(), cubeController.deleteCube);
    app.get('/', auth(false), cubeController.getHome);

    // Accessories
    app.get('/create/accessory', auth(), accessoryController.getCreate);
    app.post('/create/accessory', auth(), accessoryController.createAccessory);
    app.get('/attach/accessory/:id', auth(), accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:id', auth(), accessoryController.attachAccessory);

    // Users
    app.get('/register', authController.getRegister);
    app.post('/register', authController.register);
    app.get('/login', authController.getLogin);
    app.post('/login', authController.login);
    app.get('/logout', auth(), authController.logout);

    app.all('*', (req, res) => res.render('404'));
};