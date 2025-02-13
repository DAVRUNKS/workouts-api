require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Import cors
const workoutroutes = require("./routes/workouts.js");
const userroutes = require("./routes/user.js");

// express app
const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "https://workouts-m1wv.onrender.com", // Allow requests from your React frontend
  credentials: true
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
