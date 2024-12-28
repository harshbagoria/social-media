const requireuser = require ('../middleware/requireuser');
const usercontroller = require ('../controller/usercontroller');
const router = require ('express').Router();
router.post('/follow',requireuser ,usercontroller.followUserunfollow); 
router.get('/getpostsofFollowing' , requireuser , usercontroller.getPostOfFollowing);
router.get('/getmyposts' , requireuser,usercontroller.getMyPosts);
module.exports = router;
    