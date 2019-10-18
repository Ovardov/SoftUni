const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Name should be at least 5 characters!'],
        validate: {
            validator: (value) => /^[A-Za-z0-9\s]+$/.test(value),
            message: 'Name should consist only with English letters, digits and whitespaces!'
        }
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters!'],
        validate: {
            validator: (value) => /^[A-Za-z0-9\s]+$/.test(value),
            message: 'Description should consist only with English letters, digits and whitespaces!'
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
            message: 'Image URL should start with http:// or https://'
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: Schema.Types.ObjectId,
        ref: 'Accessory'
    }],
    creatorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = model('Cube', cubeSchema);