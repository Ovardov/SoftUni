$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');


        // Display main views
        this.get('#/home', displayHome);
        this.get('#/about', displayAbout);
        this.get('#/login', displayLogin);
        this.get('#/register', displayRegister);


        // Post methods
        this.post('#/register', register);
        this.post('#/login', login);
        this.post('#/create', createTeam);
        this.post('#/edit/:id', editTeam);


        // Catalog
        this.get('#/catalog', displayCatalog);
        this.get('#/catalog/:id', displayTeam);
        this.get('#/join/:id', joinTeam);
        this.get('#/create', displayCreateTeam);
        this.get('#/edit/:id', displayEdit);


        this.get('#/logout', logout);
        this.get('#/leave', leave);

    });

    app.run('#/home');
});

function displayHome() {
    this.loggedIn = !!sessionStorage.getItem('authtoken');
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/home/home.hbs');
    })
}

function displayAbout() {
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/about/about.hbs');
    });
}

function displayLogin() {

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        loginForm: './templates/login/loginForm.hbs'
    }).then(function () {
        this.partial('./templates/login/loginPage.hbs');
    });
}

function displayRegister() {

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        registerForm: './templates/register/registerForm.hbs'
    }).then(function () {
        this.partial('./templates/register/registerPage.hbs');
    });
}

function displayCatalog(context) {

    teamsService.loadTeams()
        .then(function (data) {
            context.loggedIn = !!sessionStorage.getItem('authtoken');
            context.username = sessionStorage.getItem('username');
            context.hasNoTeam = !!sessionStorage.getItem('teamId');
            context.teams = data;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                team: './templates/catalog/team.hbs'
            })
                .then(function () {
                   this.partial('./templates/catalog/teamCatalog.hbs');
                })
        })

}

function login(context) {
    let that = this;

    let {username, password} = context.params;

    auth.login(username, password)
        .then(function (res) {

            auth.saveSession(res);
            auth.showInfo('Login Successfully');

            that.redirect('#/home');
        })
        .catch(auth.handleError);
}

function register(context) {
    let that = this;

    let {username, password, repeatPassword} = context.params;

    auth.register(username, password, repeatPassword)
        .then(function (res) {
            auth.saveSession(res);
            auth.showInfo('Registered Successfully');

            that.redirect('#/home');
        })
        .catch(auth.handleError);
}

function logout() {
    let that = this;

    auth.logout()
        .then(function () {
            sessionStorage.clear();

            auth.showInfo('Successfully Logout');

            that.redirect('#/home');
        })
        .catch(auth.handleError);
}

function displayCreateTeam() {
    this.loggedIn = !!sessionStorage.getItem('authtoken');
    this.username = sessionStorage.getItem('username');

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        createForm: './templates/create/createForm.hbs'
    })
        .then(function () {
           this.partial('./templates/create/createPage.hbs');
        });
}

function createTeam(context) {
    let name = context.params.name;
    let comment = context.params.comment;

    teamsService.createTeam(name, comment)
        .then(function (data) {
            teamsService.joinTeam(data._id)
                .then(function (newData) {
                    auth.saveSession(newData);
                    auth.showInfo('Team created successfully');

                    displayCatalog(context);
                })
                .catch(auth.handleError);
        })
}

function displayTeam(context) {
    let teamId = context.params.id.substr(1);

    teamsService.loadTeamDetails(teamId)
        .then(function (teamInfo) {
            context.loggedIn = !!sessionStorage.getItem('authtoken');
            context.username = sessionStorage.getItem('username');
            context.name = teamInfo.name;
            context.comment = teamInfo.comment;
            context.members = teamInfo.members;
            context.teamId = teamInfo._id;
            context.isOnTeam = teamInfo._id === sessionStorage.getItem('teamId');
            context.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId');


            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                teamMember: './templates/catalog/teamMember.hbs',
                teamControls: './templates/catalog/teamControls.hbs'
            }).then(function () {
                   this.partial('./templates/catalog/details.hbs');
                });
        })
}

function joinTeam(context) {
    let teamId = context.params.id.substr(1);

    teamsService.joinTeam(teamId)
        .then(function (data) {
            auth.saveSession(data);

            auth.showInfo('You joined in a team successfully');

            displayCatalog(context);
        })
}

function displayEdit(context) {
    let that = this;

    context.loggedIn = !!sessionStorage.getItem('authtoken');
    context.username = sessionStorage.getItem('username');
    context.teamId = context.params.id.substr(1);

    teamsService.loadTeamDetails(context.teamId)
        .then(function (data) {
            context.name = data.name;
            context.comment = data.comment;

            that.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                editForm: './templates/edit/editForm.hbs'
            })
                .then(function () {
                   this.partial('./templates/edit/editPage.hbs')
                });
        });
}

function editTeam(context) {
    let teamId = context.params.id.substr(1);

    let name = context.params.name;
    let comment = context.params.comment;

    teamsService.edit(teamId, name, comment)
        .then(function () {
            auth.showInfo(`Team has been edited`);

            displayCatalog(context);

        })
        .catch(auth.handleError);
}

function leave(context) {
    teamsService.leaveTeam()
        .then(function (response) {
            auth.saveSession(response);

            auth.showInfo('You left successfully');

            displayCatalog(context)
        })
        .catch(auth.handleError);
}