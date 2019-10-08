const { Schema, model } = require('mongoose');

const accessorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cubes: [{
        type: Schema.Types.ObjectId,
        ref: 'Cube'
    }]
});

module.exports = model('Accessory', accessorySchema);