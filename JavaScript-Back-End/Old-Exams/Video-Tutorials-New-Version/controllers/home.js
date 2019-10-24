const { courseModel } = require('../models/index');


async function getHome(req, res, next) {
    const user = req.user;
    let { search } = req.query;
    let query = { isPublic: true };

    if (search) {
        query = {
            ...query,
            title: { $regex: search, $options: 'i' }
        };
    }

    try {
        let courses = [];

        if (user) {
            courses = await courseModel.find(query).sort({ 'createdAt': -1 })
        } else {
            courses = await courseModel.aggregate([
                { '$match': { 'isPublic': true } },
                {
                    '$project': {
                        'title': 1,
                        'isPublic': 1,
                        'description': 1,
                        'imageUrl': 1,
                        'creatorId': 1,
                        'createdAt': 1,
                        'usersEnrolledCount': { '$size': '$usersEnrolled' }
                    }
                },
                { '$sort': { 'usersEnrolledCount': -1 } },
                { '$limit': 3 }
            ]);
        }

        res.render('index', { user, courses, search });
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getHome
};