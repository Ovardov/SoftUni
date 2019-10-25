const { homeController, userController, articleController } = require('../controllers/index');
const { auth } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);

    // Articles
    app.get('/article/create', auth(), articleController.getCreate);
    app.post('/article/create', auth(), articleController.createArticle);
    app.get('/article/details/:id', auth(false), articleController.getDetails);
    app.get('/article/edit/:id', auth(), articleController.getEdit);
    app.post('/article/edit/:id', auth(), articleController.editArticle);
    app.get('/article/delete/:id', auth(), articleController.deleteArticle);
    app.get('/article/all', auth(false), articleController.getAllArticles);
    app.post('/article/search', auth(false), articleController.searchArticle);

    app.get('/', auth(false), homeController.getHome);

    app.all('*', auth(false), (req, res) => res.render('errors/404', { user: req.user }));
};