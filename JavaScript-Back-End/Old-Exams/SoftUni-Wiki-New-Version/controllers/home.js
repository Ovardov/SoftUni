const { articleModel } = require('../models/index');

async function getHome(req, res, next) {
    const user = req.user;

    try {
        const articles = await articleModel.find({})
            .sort({ 'creationDate': -1 })
            .limit(3)

        articles.map(article => {
            article.description = article.description.split(' ')
                .slice(0, 50)
                .join(' ')
                .concat('...');
        })

        res.render('index', { user, articles });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getHome
};