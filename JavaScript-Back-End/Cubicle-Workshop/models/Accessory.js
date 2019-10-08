const { Schema, model } = require('mongoose');

const accessorySchema = new Schema ({
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
    cubes: [{
        type: Schema.Types.ObjectId,
        ref: 'Cube'
    }]
});

module.exports = model('Accessory', accessorySchema);