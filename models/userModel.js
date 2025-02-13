const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Define a static method for signup
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)){
        throw new Error("email is not valid");
    }
    if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }


    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });
    return user;
};

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('incorrect password')
    }

    return user
}

module.exports = mongoose.model("User", userSchema);
