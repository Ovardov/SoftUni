const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9999,
        dbURL: 'mongodb://localhost:27017/origami',
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];