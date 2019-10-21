const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: [50, 'Description should be less than 50 symbols!']
    },
    imageUrl: {
        type: String
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    usersEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = model('Course', courseSchema);