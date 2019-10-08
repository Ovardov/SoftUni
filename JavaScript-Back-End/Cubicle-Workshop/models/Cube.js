const {Schema, model} = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length < 50,
            message: 'Description length should be less than 50 symbols'
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.startsWith('http'),
            message: 'imageUrl should start with http or https'
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
    }]
});

module.exports = model('Cube', cubeSchema);