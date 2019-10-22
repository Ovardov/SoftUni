const jwt = require('./jwt');
const auth = require('./auth');
const handleError = require('./handleError');
const permit = require('./permission');

module.exports = {
    jwt,
    auth,
    handleError,
    permit
}