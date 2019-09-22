const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const breeds = require('../data/breeds');
const cats = require('../data/cats');

function catRouter(req, res) {
    const {pathname} = url.parse(req.url);

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let addCatPath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        const stream = fs.createReadStream(addCatPath, {encoding: 'utf-8'});

        stream.on('error', function (err) {
            console.error(err);
        });

        stream.pipe(res);
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let addBreedPath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        const stream = fs.createReadStream(addBreedPath, {encoding: 'utf-8'});

        stream.on('error', function (err) {
            console.error(err);
        });

        stream.pipe(res);
    } else {
        return true;
    }
}

module.exports = catRouter;