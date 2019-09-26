const url = require('url');
const path = require('path');
const fs = require('fs');

const cats = require('../data/cats.json');


function getHome(req, res) {
    const {pathname} = url.parse(req.url);

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

                let modifiedCats = cats.map((cat) =>
                    `<li>
                        <img src="${path.join(`./content/images/${cat.image}`)}" alt="${cat.name}">
                            <h3>${cat.name}</h3>
                            <p><span>Breed: </span>${cat.breed}</p>
                        <p><span>Description: </span>${cat.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                        <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                        </ul>
                    </li>`
                );

                let modifiedData = data.toString().replace('{{cats}}', modifiedCats);

                res.write(modifiedData);
                res.end();
            }
        });
    } else {
        return true;
    }
}

module.exports = getHome;