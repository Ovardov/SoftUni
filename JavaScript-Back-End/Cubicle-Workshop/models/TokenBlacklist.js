const { Schema, model } = require('mongoose');

const tokenBlacklistSchema = new Schema({
    token: String
});

module.exports = model('TokenBlacklist', tokenBlacklistSchema);
