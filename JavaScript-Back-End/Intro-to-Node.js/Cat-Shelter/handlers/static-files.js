const url = require('url');
const path = require('path');
const fs = require('fs');

function getContentType(url) {

    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('js')) {
        return 'application/json';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('png')) {
        return 'image/png';
    } else if (url.endsWith('.ico')) {
        return 'image/x-icon';
    }
}

function getStaticFile(req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname.startsWith('/content') && req.method === 'GET') {
        let contentPath = path.normalize(
            path.join(__dirname, `../${pathname}`)
        );

        fs.readFile(contentPath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Page Not Found');
                res.end();

            } else {
                res.writeHead(200, {
                    'Content-Type': getContentType(req.url)
                });

                res.write(data);
                res.end();
            }
        })
    } else {
        return true;
    }
}

module.exports = getStaticFile;