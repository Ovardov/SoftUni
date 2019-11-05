const { homeController, userController, expenseController } = require('../controllers/index');
const { auth } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);
    app.post('/refill', auth(), userController.refill);
    app.get('/profile/:id', auth(), userController.getProfile);

    // Expenses
    app.get('/expense/create', auth(), expenseController.getCreate);
    app.post('/expense/create', auth(), expenseController.createExpense);
    app.get('/expense/report/:id', auth(), expenseController.reportExpense);
    app.get('/expense/delete/:id', auth(), expenseController.deleteExpense);

    app.get('/', auth(false), homeController.getHome);

    app.all('*', auth(false), (req, res) => res.render('errors/404', { user: req.user }));
};