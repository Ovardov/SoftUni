const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: [50, 'Description should be less than 50 symbols']
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = model('Project', projectSchema);