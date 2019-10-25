const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Title should be at least 5 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters']
    },
    articleAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Article', articleSchema);