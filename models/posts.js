const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    image :{
        PublicID : String,
        url : String
    },
    captions :{
        type : String,
        required : true 
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})
module.exports = mongoose.model('posts',PostSchema);