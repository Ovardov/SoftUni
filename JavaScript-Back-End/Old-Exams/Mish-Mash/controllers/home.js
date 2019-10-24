const { channelModel } = require('../models/index');
const { handleError } = require('../utils/index');

async function getHome(req, res, next) {
    const user = req.user;
    let channels = [];

    try {
        if (user) {
            let followedChannelsTags = [];
            channels = await channelModel.find({}).populate('followers');

            channels.forEach(channel => {
                
                if(channel.followers.length > 0) {
                    channel.followers.forEach(channelFollowers => {

                        if (channelFollowers.id === user.id) {
                            channel.isFollowed = true;
                            channel.isOther = false;
                            followedChannelsTags = [...followedChannelsTags, ...channel.tags];
                        }  else {
                            channel.isOther = true;
                        }
                    })
                } else {
                    if(!channel.isSuggested && !channel.isFollowed) {
                        channel.isOther = true;
                    }
                }
            });

            channels.forEach(channel => {
                if(followedChannelsTags.length > 0) {
                    followedChannelsTags.forEach(tag => {
                        if(channel.tags.includes(tag)) {
                            
                            if(channel.isFollowed) {
                                channel.isOther = false;
                                return;
                            }

                            if(channel.isOther) {
                                channel.isOther = false;
                            }

                            channel.isSuggested = true;
                        }
                    })
                } 
            })
        }

        res.render('index', { user, channels });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getHome
};