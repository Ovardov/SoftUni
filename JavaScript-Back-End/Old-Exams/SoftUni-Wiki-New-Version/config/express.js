const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const secret = 'secret';

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(secret));
    app.use(express.static(path.resolve(__basedir, './static')));

    app.engine('.hbs', handlebars({ extname: '.hbs', layoutsDir: path.resolve(__basedir, './views'), defaultLayout: 'main.hbs' }));
    app.set('view engine', '.hbs');

    app.set('views', path.resolve(__basedir, './views'));
};