const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title should be at least 4 characters!'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters!'],
        maxlength: [50, 'Description should be less than 50 characters!'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.startsWith('http'),
            message: 'Image Url should starts with https or https'
        },
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date || String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    usersEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = model('Course', courseSchema);