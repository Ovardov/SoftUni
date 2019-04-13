const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');
        // home page routes
        this.get('/index.html', handlers.getHome);
        this.get('/', handlers.getHome);
        this.get('#/home', handlers.getHome);

        // user routes
        this.get('#/register', handlers.getRegister);
        this.get('#/login', handlers.getLogin);

        this.post('#/register', handlers.registerUser);
        this.post('#/login', handlers.loginUser);
        this.get('#/logout', handlers.logoutUser);

        // ADD YOUR ROUTES HERE
        this.get('#/editor', handlers.getEditor);

        this.post('#/editor/addEntry', handlers.addEntry);

        this.get('#/editor/createReceipt', handlers.createReceipt);

        this.get('#/overview', handlers.getOverview);

        this.get('#/editor/deleteEntry/:id', handlers.deleteEntry);

        this.post('#/editor/checkout', handlers.checkout);

        this.get('#/details/:id', handlers.getReceiptDetails);
    });

    app.run('#/home');
});