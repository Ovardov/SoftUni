const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    teams:[{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    profilePicture: {
        type: String,
        default: 'https://zdnet2.cbsistatic.com/hub/i/2014/10/05/f5f4de53-4c91-11e4-b6a0-d4ae52e95e57/9400d70c5342da0f03de3b11bbf74c0e/facebook-anonymous-silhouette.png'
    },
    role: [{
        type: String,
        enum: ['User', 'Admin']
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
    if (!this.profilePicture) {
        this.profilePicture = 'https://zdnet2.cbsistatic.com/hub/i/2014/10/05/f5f4de53-4c91-11e4-b6a0-d4ae52e95e57/9400d70c5342da0f03de3b11bbf74c0e/facebook-anonymous-silhouette.png';
    }

    next();
});

module.exports = model('User', userSchema);