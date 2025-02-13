const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // You forgot to import User

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
