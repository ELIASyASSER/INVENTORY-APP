const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const badRequest = require("../customErrors/badRequest")
const passport = require("passport")

const postregisterUser = async(req,res)=>{

    const {username,password,confirmPassword,email} = req.body
    try {
        await User.create({username,password,confirmPassword,email})
        
        res.redirect("/login")
    } catch (error) {
        console.log(error);
        res.status(error.statusCode||400).send(error.message||"somethign went wrong ")
    }
}



const registerUser = async(req,res)=>{
    res.render("register.ejs")
}

const postloginUser = async(req,res,next)=>{
    // Here, only code that happens after the login is successful is needed because passport handles the checking
    // of the username/password by the authentication strategy we specified in app.js
    res.redirect("/show");
}

const loginUser = async(req,res)=>{
    console.log(req.session);

    res.render("login.ejs")
}


module.exports = {
    postregisterUser,
    registerUser,
    postloginUser,
    loginUser,

}
