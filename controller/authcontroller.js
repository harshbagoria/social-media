const bcrypt = require('bcrypt');
const User = require("../models/User.js");
const { error, sucess } = require('../utils/responsecontroller.js');

const jwt = require('jsonwebtoken');


const generateAccessToken = (data) => {
    try {
        // Check if the private key is set
        if (!process.env.ACCESS_TOKEN_PRIVATE_KEY) {
            throw new Error('ACCESS_TOKEN_PRIVATE_KEY is not defined');
        }

        // Generate the token with a shorter expiry time (e.g., 15 minutes)
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "1d", // Token expires in 1 year
        });
        console.log('Generated Access Token:', token);
        return token;
    } catch (error) {
        console.error('Access Token Generation Error:', error.message); // Log the error message
        return null;
    }
};


//refresh token
const generateRefreshtoken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFERSH_TOKEN_PRIVATE_KEY ,{
            expiresIn: "1y",
        });
        console.log('Generated Token:', token);
        return token;


     } catch (error) {
        console.error('Token Generation Error:', error);
        return null; // Return null or handle the error appropriately
    }
};

//Api will check that validity of refershtoken
const refreshacesstokencontroller =  async (req ,res)=>{
    const{refreshToken} = req.body;
    if(!refreshToken){
        return res.status(401).send('refresh token is required');
    }
    try {
        const decode = jwt.verify(
            refreshToken ,
            process.env.REFERSH_TOKEN_PRIVATE_KEY
        );
        const _id = decode._id;
        const accessToken = generateAccessToken({_id});
        // return res.status(201).json({accessToken});
        return res.send  (error(401),"invalid refresh token");
    }
    catch(e){
        console.log(e);
        
        return res.status(401).send('Invalid refresh');

    }

}

const signupController = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        if (!email || !password || !name ) {
          //  return res.status(400).send('All fields are required');
          return res.send(error(400 , 'All fiels are required' ));
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send(error(409 , 'user is already exists' ));
           // return res.send(error(400 , 'All fiels are required' ));
          
           
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

       // return res.status(201).json({ user });
        return res.send (
            sucess (201 ,{
                user ,
            })
        );

    } catch (e) {
      
        // return res.status(500).send('Failed to sign up user');
        return res.send(error(500 , e.message));
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            //return res.status(400).send("All fields are required");
            return res.send(error(400 , 'All fiels are required' ));
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          //  return res.status(404).send("User is not registered");
            return res.send(error(401 , 'user is not registered' ));
        }

        // Compare the provided password with the stored hashed password
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            //return res.status(403).send("incorrect password");
            return res.send(error(403 , 'incorrect password' ));
        }

        // Generate an access token
        const accessToken = generateAccessToken({ _id: user._id, });
        const refreshToken = generateRefreshtoken({id:user._id ,});

        // Check if the token was generated successfully
        if (!accessToken) {
            
            //return res.status(500).send('Failed to generate access token');
            return res.send(error(400 , 'Failed to generate acess token' ));
        }
      

        // Set the access token in an HTTP-only cookie
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure only in production
        });

        // Send the access token as JSON response
       
        return  res.send((sucess(201 , {accessToken})));

    } catch (e) {
        console.error('Login Error:', error.message); // Log the error message
       // return res.status(500).send('Failed to log in user');
        return res.send(error(500 , 'Failed to log in user' ));
    }
};
const logoutController = async (req ,res) =>{
    try {
      res.clearCookie('jwt' , {
        httpOnly : true ,
        secure : true ,
      })
      return res.send(sucess(200 , 'user logged out'));


    } catch (e){
        return res.send(error(500 , e.message));
    }

}


module.exports = {
    signupController,
    loginController,
     refreshacesstokencontroller ,
     logoutController  
     
};
