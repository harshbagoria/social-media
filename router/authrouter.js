const express = require('express');
const authController = require('../controller/authcontroller'); // Ensure this path is correct

const router = express.Router();

router.post('/signup', authController.signupController); // Ensure function name matches
router.post('/login', authController.loginController); // Ensure function name matches
router.post("/refresh" ,authController.refreshacesstokencontroller);
router.post("/logout" ,authController.logoutController);
module.exports = router;
