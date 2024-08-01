const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { router: userAuth } = require("./routes/userAuth");
const { router: home } = require("./routes/userAuth");
const { router: addBlog } = require("./routes/blog");
const { connectToDB } = require("./connectToDB");

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const whitelist = [
  "http://localhost:5173", // Local development URL
  process.env.REACT_APP_URL, //  Production level
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable cookies and other credentials
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all methods
};

app.use(cors(corsOptions));

// Middleware to parse frontend data (Body)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files from the frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// API routes
app.use("/", home);
app.use("/", userAuth);
app.use("/", addBlog);

// MongoDB connection
connectToDB(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Catch-all handler to serve React's index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
