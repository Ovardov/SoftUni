function validateRequest(request) {
    let validMethod = false;
    let validUri = false;
    let validVersion = false;
    let validMessage = false;

    let uriPattern = /^[a-z.0-9]+$/;
    let messagePattern = /^[^<>\\&'"]+$/;

    if (request.hasOwnProperty('method')) {
        methodValidation(request);

        if (validMethod === false) {
            printError('Method');
        }
    } else {
        printError('Method');
    }

    if (request.hasOwnProperty('uri')) {
        uriValidation(request);

        if (validUri === false) {
            printError('URI');
        }

    } else {
        printError('URI');
    }

    if (request.hasOwnProperty('version')) {
        versionValidation(request);

        if (validVersion === false) {
            printError('Version');
        }
    } else {
        printError('Version');
    }

    if (request.hasOwnProperty('message')) {
        messageValidation(request);

        if (validMessage === false) {
            printError('Message');
        }
    } else {
        printError('Message');
    }

    if (validMethod && validUri && validVersion && validMessage) {
        return request;
    }


    function methodValidation(request) {
        if (request.method === 'GET' || request.method === 'POST' || request.method === 'DELETE' || request.method === 'CONNECT') {
            validMethod = true;
        }

        return validMethod;
    }

    function uriValidation(request) {
        if (request.uri.match(uriPattern) || request.uri === '*') {
            validUri = true;
        }

        return validUri;
    }

    function versionValidation() {
        if (request.version === 'HTTP/0.9' || request.version === 'HTTP/1.0' || request.version === 'HTTP/1.1' || request.version === 'HTTP/2.0') {
            validVersion = true;
        }

        return validVersion;
    }

    function messageValidation(request) {
        if (request.message.match(messagePattern) || request.message === '') {
            validMessage = true;
        }

        return validMessage;
    }

    function printError(header) {
        throw new Error(`Invalid request header: Invalid ${header}`)
    }
}

let test0 = {
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
};

let test1 = {
    method: 'OPTIONS',
    uri: 'git.master',
    version: 'HTTP/1.1',
    message: '-recursive'
};

let test2 = {
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
};

console.log(validateRequest(test0));
console.log(validateRequest(test1));
console.log(validateRequest(test2));
