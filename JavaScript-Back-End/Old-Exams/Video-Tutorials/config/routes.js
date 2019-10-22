const { homeController, userController, courseController, lectureController } = require('../controllers/index');
const { auth, permit } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);

    // Courses
    app.get('/course/add', auth(), permit('Admin'), courseController.getCreate);
    app.post('/course/add', auth(), permit('Admin'), courseController.create);
    app.get('/course/edit/:id', auth(), permit('Admin'), courseController.getEdit);
    app.post('/course/edit/:id', auth(), permit('Admin'), courseController.edit);
    app.get('/course/details/:id', auth(), permit('User'), courseController.getDetails);
    app.get('/course/enroll/:id', auth(), permit('User'), courseController.enroll);

    // Lecture
    app.get('/lecture/add/:id', auth(), permit('Admin'), lectureController.getCreate);
    app.post('/lecture/add/:id', auth(), permit('Admin'), lectureController.create);
    app.get('/lecture/delete/:id', auth(), permit('Admin'), lectureController.deleteLecture);
    app.get('/lecture/play/:id', auth(), permit('User'), lectureController.play);

    app.get('/', auth(false), homeController.getHome);

    app.all('*', auth(), (req, res) => res.render('errors/404', { user: req.user }));
};