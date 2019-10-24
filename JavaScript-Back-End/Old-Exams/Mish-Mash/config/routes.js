const { homeController, userController, channelController } = require('../controllers/index');
const { auth, permit } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);
    app.get('/my-channels', auth(), permit(['Admin', 'User']), userController.myChannels);

    // Channels
    app.get('/channel/create', auth(), permit('Admin'), channelController.getCreate);
    app.post('/channel/create', auth(), permit('Admin'), channelController.create);
    app.get('/channel/follow/:id', auth(), permit(['Admin', 'User']), channelController.follow);
    app.get('/channel/unfollow/:id', auth(), permit(['Admin', 'User']), channelController.unfollow);

    app.get('/channel/details/:id', auth(), permit(['Admin', 'User']), channelController.getDetails);


    app.get('/', auth(false), homeController.getHome);

    app.all('*', auth(), (req, res) => res.render('errors/404', { user: req.user }));
};