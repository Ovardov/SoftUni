const { homeController, userController, courseController } = require('../controllers/index');
const { auth } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);

    // Courses
    app.get('/course/create', auth(), courseController.getCreate);
    app.post('/course/create', auth(), courseController.createCourse);
    app.get('/course/details/:id', auth(), courseController.getDetails);
    app.get('/course/edit/:id', auth(), courseController.getEdit);
    app.post('/course/edit/:id', auth(), courseController.editCourse);
    app.get('/course/delete/:id', auth(), courseController.deleteCourse);
    app.get('/course/enroll/:id', auth(), courseController.enrollCourse)


    app.get('/', auth(false), homeController.getHome);

    app.all('*', auth(false), (req, res) => res.render('errors/404', { user: req.user }));
};