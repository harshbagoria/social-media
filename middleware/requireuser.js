// const jwt = require('jsonwebtoken');

// module.exports = async (req,res ,next) => {
//     if(!req.headers || !req.headers.authorization || ! req.headers.authorization.startsWith("Bearer"))
// {
//   return res.status(401).send('Authorization header is required');
// }
//   const accessToken = req.headers.authorization.split(" ")[1];
//   try{
//     const decode = jwt.verify(accessToken , process.env.ACCESS_TOKEN_PRIVATE_KEY );
   
//   req._id = decode._id;
//   next();
//   }
//   catch(error){
//     console.log(error);
//     return res.status(401).send("Invalid acess key");

//   }
//   next();
// };

const jwt = require('jsonwebtoken');

const error = (statusCode, message) => {
    return {
        success: false,
        status: statusCode,
        message: message
    };
};

module.exports = async (req, res, next) => {
    // Check if the Authorization header is present and starts with "Bearer"
    if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
       // return res.status(401).send('Authorization header is required');
        return res.send(error(401 , 'Authorization header is required' ));
    }

    // Extract the token from the Authorization header
    const accessToken = req.headers.authorization.split(" ")[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        
        // Attach the user ID to the request object
        req._id = decoded._id;

        // Call the next middleware or route handler
        next();
    } catch (e) {
        console.log(e); // Log the error message
        //return res.status(401).send('Invalid access token');
        return res.send(error(401 , 'Invaild access token' ));
    }
};
