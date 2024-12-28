const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        publicid: { type: String }, // Corrected to use { type: String }
        url: { type: String }, // Changed 'string' to String
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Ensure consistency, capitalized 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId, // Fixed typo (ObjectId should be capitalized)
            ref: 'User', // Ensure consistency
        }
    ],
    posts: [ // Updated from 'post' to 'posts'
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: []
        }
    ]
});

module.exports = mongoose.model('User', userSchema); // Kept 'User' for consistency
 