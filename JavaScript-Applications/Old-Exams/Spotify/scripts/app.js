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

    // Songs
    this.get('#/allSongs', handlers.getAllSongs);
    this.get('#/createSong', handlers.getCreateSong);
    this.get('#/mySongs', handlers.getMySongs);

    this.post('#/createSong', handlers.createSong);

    this.get('#/remove/:id', handlers.removeSong);
    this.get('#/like/:id', handlers.likeSong);
    this.get('#/listen/:id', handlers.listenSong);

  });

  app.run('#/home');
});