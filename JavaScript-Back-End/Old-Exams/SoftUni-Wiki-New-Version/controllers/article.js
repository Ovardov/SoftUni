const { articleModel, userModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;

    res.render('article/create', { user });
}

async function createArticle(req, res, next) {
    const user = req.user;
    const { title, description } = req.body;

    const newArticle = {
        title,
        description,
        articleAuthor: user._id
    }

    try {
        const article = await articleModel.create(newArticle);
        await userModel.updateOne({ _id: user._id }, { $push: { createdArticles: article._id } })

        res.redirect('/');
    } catch (e) {
        e.code === 11000 ? handleError(res, 'title', 'Title is already taken!') : handleError(res, e);

        res.render('article/create', { user, title, description });
    }
}

function getDetails(req, res, next) {
    const user = req.user;
    const articleId = req.params.id;

    articleModel.findById(articleId).populate('articleAuthor')
        .then((article) => {
            
            if(user) {
                if (article.articleAuthor.id === user.id) {
                    user.isAuthor = true;
                }
            }

            let formatedDecription = article.description.split('\r\n\r\n');

            res.render('article/details', { user, article, formatedDecription });
        })
        .catch(err => {
            next(err);
        })
}

function getEdit(req, res, next) {
    const user = req.user;
    const articleId = req.params.id;

    articleModel.findById(articleId)
        .then((article) => {

            res.render('article/edit', { user, article });
        })
        .catch(err => {
            next(err);
        })
}

async function editArticle(req, res, next) {
    const user = req.user;
    const articleId = req.params.id;

    const { description } = req.body

    let newArticle = {
        description
    }

    try {
        await articleModel.updateOne({ _id: articleId }, newArticle, { runValidators: true });

        res.redirect(`/article/details/${articleId}`);
    } catch (e) {
        handleError(res, e);

        const article = await articleModel.findById(articleId);
       
        newArticle = {
            _id: articleId,
            title: article.title,
            description
        }

        res.render('article/edit', { user, article: newArticle })
    }
}

async function deleteArticle(req, res, next) {
    const user = req.user;
    const articleId = req.params.id;

    try {
        await userModel.updateOne({ _id: user._id }, { $pull: { createdArticles: articleId } });
        await articleModel.findByIdAndDelete(articleId);

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

function getAllArticles(req, res, next) {
    const user = req.user;

    articleModel.find({})
        .then(articles => {
            res.render('article/all', { user, articles })
        })
        .catch(err => {
            next(err);
        })
}

function searchArticle(req, res, next) {
    const user = req.user;
    const { search } = req.body;

    const query = {
        title: { $regex: search, $options: 'i' }
    }

    articleModel.find(query)
        .then(articles => {
            res.render('article/search', { user, articles, search });
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    getCreate,
    createArticle,
    getDetails,
    getEdit,
    editArticle,
    deleteArticle,
    getAllArticles,
    searchArticle
}