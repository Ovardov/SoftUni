const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    merchant: {
        type: String,
        required: true,
        minlength: [4, 'Merchant should be at least 4 characters!'],
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'The total should be positive number'
        }
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description should be at least 10 characters!'],
        maxlength: [50, 'Description should be less than 50 characters!'],
    },
    report: {
        type: Boolean,
        required: true,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Expense', expenseSchema);