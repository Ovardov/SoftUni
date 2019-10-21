const { courseModel, userModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;

    res.render('admin/course-create', { user });
}

function create(req, res, next) {
    const user = req.user;
    let { title, description, imageUrl, isPublic } = req.body;

    if (isPublic === 'on') {
        isPublic = true;
    } else {
        isPublic = false;
    }

    const newCourse = {
        title,
        description,
        imageUrl,
        isPublic
    }

    courseModel.create(newCourse)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            handleError(res, err);
            res.render('admin/course-create', { user, course: newCourse });
        });
}

function getEdit(req, res, next) {
    const user = req.user;
    const id = req.params.id;

    courseModel.findOne({ _id: id })
        .then(course => {
            res.render('admin/course-edit', { user, course });
        })
        .catch(next);
}

function edit(req, res, next) {
    const user = req.user;
    const id = req.params.id;

    let { title, description, imageUrl, isPublic } = req.body;

    if (isPublic === 'on') {
        isPublic = true;
    } else {
        isPublic = false;
    }

    const newCourse = {
        title,
        description,
        imageUrl,
        isPublic
    }

    courseModel.updateOne({ _id: id }, newCourse, { runValidators: true })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            newCourse._id = id;

            handleError(res, err);
            res.render('admin/course-edit', { user, course: newCourse });
        });
}

async function getDetails(req, res, next) {
    const user = req.user;
    const id = req.params.id;

    try {
        const course = await courseModel.findOne({ _id: id, isPublic: true })
            .populate('users')
            .populate('lectures');

        if (user.enrolledCourses.includes(course._id)) {
            user.isEnrolled = true;
        }

        res.render('user/details', { user, course });

    } catch (e) {
        next(e);
    }
}

async function enroll(req, res, next) {
    const user = req.user;
    const courseId = req.params.id;

    try {
        await courseModel.updateOne({ _id: courseId }, { $push: { usersEnrolled: user._id } });

        await userModel.updateOne({ _id: user._id }, { $push: { enrolledCourses: courseId } });

        res.redirect(`/course/details/${courseId}`);
    } catch (e) {
        next(e);
    }

}

module.exports = {
    getCreate,
    create,
    getEdit,
    edit,
    getDetails,
    enroll
}