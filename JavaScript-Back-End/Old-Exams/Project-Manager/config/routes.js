const { homeController, userController, teamController, projectController } = require('../controllers/index');
const { auth, permit } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/profile/:id', auth(), permit(['Admin', 'User']), userController.getProfile);
    app.get('/profile/leave/:id', auth(), permit('User'), userController.leaveTeam);

    app.get('/logout', auth(), userController.logout);

    // Teams
    app.get('/team/create', auth(), permit('Admin'), teamController.getCreate);
    app.post('/team/create', auth(), permit('Admin'), teamController.create)
    app.get('/team/all', auth(), permit(['Admin', 'User']), teamController.getTeams);
    app.post('/team/all', auth(), permit(['Admin', 'User']), teamController.distributeTeams);


    // Projects
    app.get('/project/create', auth(), permit('Admin'), projectController.getCreate);
    app.post('/project/create', auth(), permit('Admin'), projectController.create);
    app.get('/project/all', auth(), permit(['Admin', 'User']), projectController.getProjects);
    app.post('/project/all', auth(), permit(['Admin', 'User']), projectController.distributeProjects);


    app.get('/', auth(false), homeController.getHome);

    app.all('*', auth(), (req, res) => res.render('errors/404', { user: req.user }));
};