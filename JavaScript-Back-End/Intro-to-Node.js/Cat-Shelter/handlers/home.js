const url = require('url');
const path = require('path');
const fs = require('fs');

const cats = require('../data/cats');


function getHome(req, res) {
    const { pathname } = url.parse(req.url);

    if (pathname === '/' && req.method === 'GET') {
        let homePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(homePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Page Not Found');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write(data);
                res.end();
            }
        });
    } else {
        return true;
    }
}

module.exports = getHome;
