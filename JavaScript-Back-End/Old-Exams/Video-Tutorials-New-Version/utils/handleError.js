function handleError(res, reason, message) {
    if (typeof reason === 'object') {
        res.locals.globalError = reason.errors;
    } else {
        res.locals.globalError = {
            reason: message
        }
    }
}

module.exports = handleError;