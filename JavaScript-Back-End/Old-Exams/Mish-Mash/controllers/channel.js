const { channelModel, userModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;

    res.render('channel/create', { user })
}

function create(req, res, next) {
    let { name, description, tags, type } = req.body;
    const user = req.user;

    tags = tags.split(', ')

    const newChannel = {
        name,
        description,
        tags,
        type
    };

    channelModel.create(newChannel)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            err.code === 11000 ? handleError(res, 'name', 'This channel name is already taken!') : handleError(res, err);

            newChannel.tags = req.body.tags;

            const options = [
                { title: 'Game', selected: 'Game' == type },
                { title: 'Motivation', selected: 'Motivation' == type },
                { title: 'Lessons', selected: 'Lessons' == type },
                { title: 'Radio', selected: 'Radio' == type },
                { title: 'Other', selected: 'Other' == type }
            ];

            res.render('channel/create', { channel: newChannel, options, user });
        });
}

async function follow(req, res, next) {
    const user = req.user;
    const channelId = req.params.id;

    try {
        await channelModel.update({ _id: channelId }, { $push: { followers: user._id } }),
        await userModel.update({ _id: user._id }, { $push: { followedChannels: channelId } })

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

async function unfollow(req, res, next) {
    const user = req.user;
    const channelId = req.params.id;

    try {
        await channelModel.update({ _id: channelId }, { $pull: { followers: user._id } }),
        await userModel.update({ _id: user._id }, { $pull: { followedChannels: channelId } })

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

function getDetails(req, res, next) {
    const user = req.user;
    const channelId = req.params.id;

    channelModel.findById(channelId)
        .then(channel => {
            channel.tags = channel.tags.join(', ');

            res.render('channel/details', { user, channel })
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    getCreate,
    create,
    follow,
    unfollow,
    getDetails
}