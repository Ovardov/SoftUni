const { lectureModel, courseModel } = require('../models/index');
const { handleError } = require('../utils/index');

async function getCreate(req, res, next) {
    const user = req.user;
    const courseId = req.params.id;

    try {
        const course = await courseModel.findById(courseId).populate('lectures');
        res.render('admin/lecture-panel', { user, course });
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    const courseId = req.params.id;

    const { title, videoUrl } = req.body;

    let newLecture = {
        title,
        videoUrl
    }

    try {
        const lecture = await lectureModel.create(newLecture);

        await courseModel.updateOne({ _id: courseId }, { $push: { lectures: lecture._id } });

        newLecture.course = courseId;

        await lectureModel.updateOne({ _id: lecture._id }, newLecture);

        res.redirect(`/lecture/add/${courseId}`);
    } catch (e) {
        console.error(e);
    }
}

async function deleteLecture(req, res, next) {
    const user = req.user;
    const id = req.params.id;

    try {
        const lecture = await lectureModel.findById(id).populate('course');
        const courseId = lecture.course._id;

        await courseModel.update({ _id: courseId }, { $pull: { lectures: id } });
        await lectureModel.deleteOne({_id: id});


        res.redirect(`/lecture/add/${courseId}`);
    } catch (e) {
        console.error(e);
    }
}

async function play(req, res, next) {
    const user = req.user;
    const id = req.params.id;

    try {
        const lecture = await lectureModel.findById(id).populate('courses');
        const courseId = lecture.course;
        const course = await courseModel.findById(courseId).populate('lectures');

        res.render('user/play-video', {user, lecture, course});
    } catch(e) {
        next(e);
    }
}

module.exports = {
    getCreate,
    create,
    deleteLecture,
    play
}