const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.cookie("token", token, {
  httpOnly: true, // Prevents XSS attacks
  secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
  sameSite: "Strict" // Prevent CSRF
});


const loginUser = async (req, res) =>  {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
    
        const token = createToken(user._id)
    
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
    }

const signupUser = async (req, res) => {
const {email, password} = req.body

try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

  res.status(200).json({email, token})
} catch (error) {
  res.status(400).json({error: error.message})
}
}

module.exports = { signupUser, loginUser }