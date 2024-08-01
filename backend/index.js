const express = require("express");
const app = express();
const path = require("path");
const { router: userAuth } = require("./routes/userAuth");
const cors = require("cors");
const { router: home } = require("./routes/userAuth");
const { connectToDB } = require("./connectToDB");
const { router: addBlog } = require("./routes/blog");
require("dotenv").config();

const port = process.env.PORT || 4000;

// CORS Configuration
const whitelist = [
  "http://localhost:5173", // Local development URL
  `${process.env.REACT_API_URL}`, // Production URL
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
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware to parse frontend data (Body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/", home);
app.use("/", userAuth);
app.use("/", addBlog);

// Serve static files for images
app.use("/uploads", express.static(path.join(__dirname, "userUploads")));

// MongoDB connection
connectToDB(`${process.env.MONGODB_CONNECTION}`)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
