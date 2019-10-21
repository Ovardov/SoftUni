function getHome(req, res, next) {
    const user = req.user;

    res.render('index', { user });
}

module.exports = {
    getHome
};