const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const moveFile = require('move-file');

const breeds = require('../data/breeds');
const cats = require('../data/cats');

function catRouter(req, res) {
    const {pathname} = url.parse(req.url);

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let addCatPath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        const stream = fs.createReadStream(addCatPath, {encoding: 'utf-8'});

        stream.on('error', (err) => {
            console.error(err);
        });

        stream.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

            res.write(modifiedData);
        });

        stream.on('end', () => res.end());

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
            }

            let imageName = files.upload.name;
            let oldPath = files.upload.path;
            let newPath = path.normalize(
                path.join(__dirname, `../content/images/${imageName}`)
            );

            (async () => {
                await moveFile(oldPath, newPath);
                console.log('File was uploaded successfully');
            })();

            fs.readFile('./data/cats.json', {encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    console.error(err);
                }

                let allCats = JSON.parse(data);

                let newCat = {
                    id: allCats.length + 1,
                    ...fields,
                    image: imageName
                };

                allCats.push(newCat);
                let catsToUpload = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', catsToUpload, () => console.log('Added new cat successfully'));
            });

            res.writeHead(301, {Location: '/'});
            res.end();
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let addBreedPath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        const stream = fs.createReadStream(addBreedPath, {encoding: 'utf-8'});

        stream.on('error', (err) => {
            console.error(err);
        });

        stream.on('data', (data) => {
            res.write(data);
        });

        stream.on('end', () => res.end());

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let breedData = '';

        req.on('data', (data) => {
            breedData += data;
        });

        req.on('end', () => {
            let breedObject = qs.parse(breedData);
            let newBreed = breedObject['breed'];

            fs.readFile('./data/breeds.json', {encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    console.error(err);
                }

                let allBreeds = JSON.parse(data);
                allBreeds.push(newBreed);
                let breedsToUpload = JSON.stringify(allBreeds);

                fs.writeFile('./data/breeds.json', breedsToUpload, () => console.log('Added new breed successfully'));
            });

            res.writeHead(301, {Location: '/'});
            res.end();
        });

    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {
        let editCatPath = path.normalize(
            path.join(__dirname, '../views/editCat.html')
        );

        fs.readFile(editCatPath, {encoding: 'utf-8'}, (err, data) => {
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

                let catId = pathname.split('/')[2];

                let currentCat = cats.filter((cat) => cat.id == catId)[0];

                let allBreeds = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);

                let modifiedData = data.toString()
                    .replace('{{id}}', currentCat.id)
                    .replace('{{name}}', currentCat.name)
                    .replace('{{description}}', currentCat.description)
                    .replace('{{catBreeds}}', allBreeds)
                    .replace('{{breed}}', currentCat.breed);


                res.write(modifiedData);
                res.end();
            }
        });

    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
            }

            let imageName = files.upload.name;
            let oldPath = files.upload.path;
            let newPath = path.normalize(
                path.join(__dirname, `../content/images/${imageName}`)
            );

            (async () => {
                await moveFile(oldPath, newPath);
                console.log('File was uploaded successfully');
            })();

            fs.readFile('./data/cats.json', {encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    console.error(err);
                }

                let allCats = JSON.parse(data);

                let catId = Number(pathname.split('/')[2]);

                let editedCat = {
                    id: catId,
                    ...fields,
                    image: imageName
                };

                let catToChanged = allCats.find((cat) => cat.id == catId);

                let oldCatIndex = allCats.indexOf(catToChanged);
                allCats[oldCatIndex] = editedCat;

                let catsToUpload = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', catsToUpload, () => console.log('Added new cat successfully'));
            });

            res.writeHead(301, {Location: '/'});
            res.end();
        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let catShelterPath = path.normalize(
            path.join(__dirname, '../views/catShelter.html')
        );

        fs.readFile(catShelterPath, {encoding: 'utf-8'}, (err, data) => {
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

                let catId = pathname.split('/')[2];
                let currentCat = cats.filter((cat) => cat.id == catId)[0];

                let allBreeds = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);

                let modifiedData = data.toString()
                    .replace('{{id}}', currentCat.id)
                    .replace('{{name}}', currentCat.name)
                    .replace('{{image}}', currentCat.image)
                    .replace('{{description}}', currentCat.description)
                    .replace('{{catBreeds}}', allBreeds)
                    .replace('{{breed}}', currentCat.breed);

                res.write(modifiedData);
                res.end();
            }
        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {

        fs.readFile('./data/cats.json', {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let catId = pathname.split('/')[2];
                let allCats = JSON.parse(data);

                let remainingCats = allCats.filter((cat) => cat.id != catId);
                remainingCats = JSON.stringify(remainingCats);

                fs.writeFile('./data/cats.json', remainingCats, () => console.log('Successfully find new home'));
            }

            res.writeHead(301, {Location: '/'});
            res.end();
        });

    } else {
        return true;
    }
}

module.exports = catRouter;