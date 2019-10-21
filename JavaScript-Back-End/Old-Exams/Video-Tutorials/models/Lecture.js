const { Schema, model } = require('mongoose');

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
});

module.exports = model('Lecture', lectureSchema);