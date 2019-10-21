const { homeController, userController, courseController, lectureController } = require('../controllers/index');
const { auth } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);

    // Courses
    app.get('/course/add', auth('admin'), courseController.getCreate);
    app.post('/course/add', auth('admin'), courseController.create);
    app.get('/course/edit/:id', auth('admin'), courseController.getEdit);
    app.post('/course/edit/:id', auth('admin'), courseController.edit);
    app.get('/course/details/:id', auth('user'), courseController.getDetails);
    app.get('/course/enroll/:id', auth('user'), courseController.enroll);

    // Lecture
    app.get('/lecture/add/:id', auth('admin'), lectureController.getCreate);
    app.post('/lecture/add/:id', auth('admin'), lectureController.create);
    app.get('/lecture/delete/:id', auth('admin'), lectureController.deleteLecture);
    app.get('/lecture/play/:id', auth('user'), lectureController.play);

    app.get('/', auth('guest'), homeController.getHome);

    app.all('*', auth(), (req, res) => res.render('errors/404', { user: req.user }));
};