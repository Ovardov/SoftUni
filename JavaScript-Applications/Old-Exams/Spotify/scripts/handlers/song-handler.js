handlers.getAllSongs = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    songService.getAllSongs()
        .then(function (res) {
            let userId = sessionStorage.getItem('id');
            let songs = res;

            songs.forEach((song) => song.isCreator = song._acl.creator === userId);
            songs = songs.sort((a, b) => a.isCreator - b.isCreator);

            context.songs = songs;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                song: './templates/song/song.hbs'
            })
                .then(function () {
                    this.partial('./templates/song/allSongs.hbs');
                })
                .catch(function (error) {
                    notify.handleError(error);
                })
        });

};

handlers.getCreateSong = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    })
    .then(function () {
        this.partial('./templates/song/createSong.hbs');
    })
    .catch(function (error) {
        notify.handleError(error);
    })
};

handlers.getMySongs = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    songService.getAllMySongs()
        .then(function (res) {
            let userId = sessionStorage.getItem('id');
            let songs = res;

            songs.forEach((song) => song.isCreator = song._acl.creator === userId);

            context.songs = songs;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                song: './templates/song/song.hbs'
            })
            .then(function () {
                this.partial('./templates/song/mySongs.hbs');
            })
            .catch(function (error) {
                notify.handleError(error);
            })
        });
};

handlers.createSong = function (context) {
    let data = {...context.params, likeCounter: 0, listenCounter: 0};

    if (data.title.length < 6) {
        notify.showError('The title should be at least 6 characters long!')
    } else if (data.artist < 3) {
        notify.showError('The artist should be at least 3 characters long!')
    } else if (!data.imageURL.startsWith('https://')) {
        notify.showError('The image should start with "http://" or "https://"')
    } else {

        songService.createSong(data)
            .then(function (res) {

                notify.showInfo('Song created successfully.');
                context.redirect('#/allSongs');
            })
            .catch(function (error) {
                notify.handleError(error);
            });
    }
};

handlers.removeSong = function (context) {
    let id = context.params.id;

    songService.removeSong(id)
        .then(function () {
            notify.showInfo('Song removed successfully!');
            context.redirect('#/allSongs');
        })
        .catch(function (error) {
            notify.handleError(error);
        })

};

handlers.likeSong = function (context) {
    let id = context.params.id;

    songService.getASong(id)
        .then(function (res) {
            let song = res;

            let newLikes = Number(song.likeCounter) + 1;
            song.likeCounter = newLikes;

            songService.likeSong(id, song)
                .then(function () {
                    notify.showInfo('Liked');
                    context.redirect('#/allSongs');
                })
                .catch(function (error) {
                    notify.showError(error);
                })
        });
};

handlers.listenSong = function (context) {
    let id = context.params.id;

    songService.getASong(id)
        .then(function (res) {
            let song = res;

            let newListen = Number(song.listenCounter) + 1;
            song.listenCounter = newListen;

            songService.likeSong(id, song)
                .then(function () {

                    notify.showInfo(`You just listened ${song.title}`);
                    context.redirect('#/allSongs');
                })
                .catch(function (error) {
                    notify.showError(error);
                })
        });
};