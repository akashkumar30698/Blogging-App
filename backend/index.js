const express = require("express");
const app = express();
const path = require("path"); // For resolving template path
const {router: userAuth }= require("./routes/userAuth");
const cors = require('cors');
const { router: home } = require("./routes/userAuth"); 
const { connectToDB } = require("./connectToDB");
const { router: addBlog } = require("./routes/blog")
require('dotenv').config(); //used for securing data so important credentials cannot be accessed through source code




const port = process.env.PORT || 4000;

/*
app.use(express.static(path.join(__dirname, '../frontend/index.html')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});
*/

// CORS

app.use(cors({
  origin: `${process.env.REACT_API_URL}`,
  credentials: true,
}));

//app.use(cors(corsOptions));













// Middleware to parse frontend data (Body)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files from the 'uploads' directory


//     Dont change it                                       Give directory name
//         |                                                  |
app.use('/uploads', express.static(path.join(__dirname, 'userUploads')));
  /*    |
     THIS MIDDLEWARE IS USEFUL FOR POSTING OR RETRIEVING IMAGES FROM BACKEND(DATABASE) TO FRONTEND
      YOU CAN RETRIEVE IT FROM URL : `http://localhost:8000/uploads/{Image-Name}`
    ---> REMEMBER YOU CAN ONLY USE IT WITH MULTER
  */ 





// Set view engine to Pug
app.set("views", path.join(__dirname, "views")); // Replace with your views directory
app.set("view engine", "pug");

// Home route
app.use("/", home);

// User authentication routes
app.use("/", userAuth);

//ADD a new blog
app.use("/",addBlog)



// MongoDB connection
connectToDB(`${process.env.MONGODB_CONNECTION}`)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });



// To fix error "Cannot get /signUp" (Optional to use as error might have occured cuz of proxy in vite.config.js)

/*

// Serve static files from the React app
//FIX 1
app.use(express.static(path.join(__dirname, '../frontend/index.html')));


//FIX 2
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend' , 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

*/



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
