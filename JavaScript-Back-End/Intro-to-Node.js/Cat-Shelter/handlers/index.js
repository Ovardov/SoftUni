const homeHandler = require('./home');
const staticFilesHandler = require('./static-files');
const catHandler = require('./cat');

module.exports = [
    homeHandler,
    staticFilesHandler,
    catHandler,
];