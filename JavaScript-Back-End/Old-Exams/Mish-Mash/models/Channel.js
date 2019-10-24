const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Game', 'Motivation', 'Lessons', 'Radio', 'Other']
    },
    tags: [{
        type: String,
        required: true
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


module.exports = model('Channel', channelSchema);