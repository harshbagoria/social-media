// const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require('morgan');
// const cookieparser = require("cookie-parser");
// const cors = require('cors')

// dotenv.config({ path: "./.env" }); 


// const dbconnect  = require("./dbconnect");
// dbconnect(); 

// // Import the authentication router
// const authrouter = require('./router/authrouter');
// const postrouter  = require('./router/postrouter');

// // Initialize the Express application
// const app = express();

// //middleware
// app.use(express.json());
// app.use(morgan('common'));
// app.use(cookieparser());
// app.use(cors({
//   credential : true,
//   origin : "http://localhost:5173"
// }));




// const PORT = process.env.PORT || 4001;

// // Use the authentication router for /auth routes
// app.use('/auth', authrouter);
//   app.use('/posts',postrouter);

// // Define the root route
// app.get('/', (req, res) => {
//     res.status(200).send('ok from server');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cookieparser = require("cookie-parser");
const cors = require('cors');

dotenv.config({ path: "./.env" }); 

const dbconnect  = require("./dbconnect");
dbconnect(); 

// Import the authentication router
const authrouter = require('./router/authrouter');
const postrouter  = require('./router/postrouter');
const userrouter =  require("./router/userrouter");

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('common'));
app.use(cookieparser());
app.use(cors({
  credentials: true,  // Ensure this is lowercase and set to true
  origin: "http://localhost:5173" // Ensure this matches your frontend origin
}));

const PORT = process.env.PORT || 4001;

// Use the authentication router for /auth routes
app.use('/auth', authrouter);
app.use('/posts', postrouter);
app.use('/user' ,userrouter);

// Define the root route
app.get('/', (req, res) => {
    res.status(200).send('ok from server');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
