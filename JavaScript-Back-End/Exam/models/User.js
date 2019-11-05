const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Username should be at least 4 characters!'],
        validate: {
            validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
            message: 'Username should consist only with English letters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 characters!'],
    },
    amount: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
            message: 'The account amount should be positive number!'
        }
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }]
});


userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password)
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }

                this.password = hash;
                next();
            })
        })

        return;
    }

    next();
});

userSchema.pre("save", function (next) {
    if (!this.amount) {
        this.amount = 0;
    }

    next();
});

module.exports = model('User', userSchema);