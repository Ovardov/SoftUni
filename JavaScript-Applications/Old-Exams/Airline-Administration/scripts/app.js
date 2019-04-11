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
        this.get('#/addFlight', handlers.getAddFlight);
        this.post('#/addFlight', handlers.addFlight);

        this.get('#/details/:id', handlers.flightInfo);

        this.get('#/myFlights', handlers.getMyFlights);
        this.get('#/remove/:id', handlers.removeFlight);

        this.get('#/edit/:id', handlers.getEditFlight);
        this.post('#/edit', handlers.editFlight);
    });

    app.run('#/home');
});