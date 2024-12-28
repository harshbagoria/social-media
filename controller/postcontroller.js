// const User = require("../models/User");

// const getallpostcontroller =  async (req ,res) =>{
//     console.log(req._id);
//     return res.send(sucess(200 , "these are all the posts"));
// };
// const createpostcontroller = async (req, res ) =>{
//     try {
//         const {captions} = req.body;
//         const owner= req._id;
//        const user =  await user.findById(req.id);
//         const post = await post.create ({
//             owner ,
//             captions,
//         });
//         User.posts.push(post._id);
//         await User.save();
//         return res.send(sucess(201 ,post));
//     } catch (e) {
//         // Sending error response directly
//         return res.status(500).send({ success: false, message: e.message });
//     }
//     };


//  module.exports = {
//     getallpostcontroller,
//     createpostcontroller
// };

const User = require("../models/User");
const Post = require("../models/posts"); // Correct the path to 'posts.js'
const { post } = require("../router/postrouter");
const { sucess } = require("../utils/responsecontroller");
 
const success = (statusCode, data) => {
    return {
        success: true,
        status: statusCode,
        data: data,
    };
};

// Controller to get all posts
const getallpostcontroller = async (req, res) => {
    console.log(req._id);  // Ensure that req._id is set by middleware
    return res.send(success(200, "These are all the posts"));
};

// Controller to create a post
const createpostcontroller = async (req, res) => {
    try {
        const { captions } = req.body; // Extract captions from request body
        const owner = req._id; // Assuming the user ID is attached to the request by middleware

        // Find the user by ID (req._id is the user ID)
        const user = await User.findById(owner);
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Create a new post with owner and captions
        const post = await Post.create({
            owner,
            captions,
        });

        // Add the post ID to the user's posts array
        user.posts.push(post._id);
        await user.save(); // Save the updated user with the post reference

        // Send success response with created post
        return res.send(success(201, post));
    } catch (e) {
        console.error(e); // Log the error for debugging
        return res.status(500).send({ success: false, message: e.message });
    }
};

// const Likeandunlikepost = async (req, res)=>{
//     try {
//     const {PostID} = req.body;
//     const curUserId = req._id;

//     const post = await post.findById(PostID);
//     if(!post){
//         return res.send(error(404 ,'post not found'));
//     }
//     if(post.likes.includes(curUserId)){
//         const index =  post.likes.indexof (curUserId);
//         post.likes.slice(index,1);

//         await post.save();
//         return res.send(200, 'post unliked');

//     } else {
//         post.likes.push(curUserId);
//         await post.save();
//         return res.send(sucess(200,"post Liked"));
//     }
//     }
//     catch(e){
//         return res.send(error(500, e.message));
//     }
// }
const Likeandunlikepost = async (req, res) => {
    try {
        const { PostID } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(PostID);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Ensure the likes array exists
        if (!Array.isArray(post.likes)) {
            post.likes = [];
        }

        if (post.likes.includes(curUserId)) {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);

            await post.save();
            return res.status(200).send('Post unliked');
        } else {
            post.likes.push(curUserId);
            await post.save();
            return res.status(200).send('Post liked');
        }
    } catch (e) {
        return res.status(500).send(e.message);
    }


};
const updatePostController = async (req, res) => {
    try {
        const { PostID, captions } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(PostID);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Correct the comparison here
        if (post.owner.toString() !== curUserId.toString()) {
            return res.status(403).json({ error: 'Only owners can update their posts' });
        }

        if (captions) {
            post.captions = captions;
        }

        await post.save();
        return res.status(200).json({ success: true, post });
    } catch (e) {
        console.error(e); // Log the error for debugging
        return res.status(500).json({ error: e.message });
    }
};
const deletepost = async (req ,res ) =>{
    try{
        const { PostID, captions } = req.body;
        const curUserId = req._id;
    
    
        const post = await Post.findById(PostID);
        const curUser = await User.findById(curUserId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.owner.toString() !== curUserId.toString()) {
            return res.status(403).json({ error: 'Only owners can delete their posts' });
        }
        const index = curUser.posts.indexOf(PostID);
        curUser.posts.splice(index , 1);
        await curUser.save();
        await post.remove();
    
       return res.send(sucess(200 , 'post deleted sucessfully'));
 }catch(e){
    return res.send(error(500 , e.message));
 }
    

}
module.exports = {
    getallpostcontroller,
    createpostcontroller,
    Likeandunlikepost , 
    updatePostController , 
    deletepost

};
