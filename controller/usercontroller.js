const User = require("../models/User");
const Post = require("../models/posts"); // or the correct path to your post.js file

const {  sucess , error} = require ("../utils/responsecontroller");

const followUserunfollow = async (req, res) => {
    try {
        const { userIdtofollow } = req.body;
        const curUserId = req._id;

        const usertofollow = await User.findById(userIdtofollow.trim()); // Fixed the typo
        const curUser = await User.findById(curUserId);
        if(curUserId == userIdtofollow ){
            return res.send(error(409 , 'user cannot follow themselves'));
        }

        if (!usertofollow) {
            return res.status(404).json({ error: 'User to follow not found' });
        }

        // Check if the current user is already following the target user
        if (curUser.following.includes(userIdtofollow)) {
            const followingIndex = curUser.following.indexOf(userIdtofollow);
            curUser.following.splice(followingIndex, 1);

            const followerIndex = usertofollow.followers.indexOf(curUserId);
            usertofollow.followers.splice(followerIndex, 1);

            await usertofollow.save();
            await curUser.save();

            return res.status(200).json({ message: 'User unfollowed' });
        } else {
            usertofollow.followers.push(curUserId);
            curUser.following.push(userIdtofollow);

            await usertofollow.save();
            await curUser.save();

            return res.status(200).json({ message: 'User followed' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
};
const getPostOfFollowing = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);

        if (!curUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const posts = await Post.find({
            owner: { '$in': curUser.following }
        });

        return res.status(200).json({ success: true, posts });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
};
const getMyPosts = async (req ,res) => {
    try {
        const curUserId = req._id;
        const allUserposts = await Post.find({
            owner : curUserId
        });
        return res.send(sucess(200 ,{allUserposts}))

    }catch (error){
        console.log(e);
        console.error("Error fetching posts:", error);
        return res.send(error(500  , e.message));
    }
}

module.exports = {
    followUserunfollow,
    getPostOfFollowing ,
    getMyPosts 
};

