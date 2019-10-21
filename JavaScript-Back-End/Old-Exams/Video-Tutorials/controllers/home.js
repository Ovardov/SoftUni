const { courseModel } = require('../models/index');

async function getHome(req, res, next) {
    const user = req.user;
    let { search } = req.query;
    let courses = [];
    let query = { isPublic: true }

    if (search) {
        query = { ...query, title: { $regex: search, $options: 'i' } };
    }

    if (user) {
        if (user.isAdmin) {
            courses = await courseModel.find({});
        } else {
            courses = await courseModel.find(query);
        }
    } else {
        courses = await courseModel.find(query)
            .sort({ 'usersEnrolled': -1 })
            .limit(3);
    }

    res.render('index', { user, courses, search });
}

module.exports = {
    getHome
};