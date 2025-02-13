require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Import cors
const workoutroutes = require("./routes/workouts.js");
const userroutes = require("./routes/user.js");

// express app
const app = express();

const allowedOrigins = [
  "https://workouts-4x74.onrender.com",  // New frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"));  // Deny the request
    }
  },
  credentials: true  // Allow cookies and authentication headers
}));

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutroutes);
app.use("/api/user", userroutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5001, () => { // ✅ Added default port fallback
      console.log("connected & listening on port", process.env.PORT || 5001);
    });
  })
  .catch((error) => {
    console.log(error);
  });
