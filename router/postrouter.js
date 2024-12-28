// const router  = require("express").router();
// const postscontroller = require("../controller/postcontroller");
// router.get("/all",postscontroller.getallpostscontroller);

// module.exports = router;
const express = require('express');
const postcontroller = require('../controller/postcontroller');
 const requireuser = require("../middleware/requireuser");

const router = express.Router();
router.get("/all" ,requireuser , postcontroller.getallpostcontroller);
router.post('/',requireuser, postcontroller.createpostcontroller);
router.post('/like',requireuser, postcontroller.Likeandunlikepost); // Ensure function name matches
router.put('/' , requireuser , postcontroller.updatePostController);
router.delete('/' , requireuser , postcontroller.deletepost);

module.exports = router;
 