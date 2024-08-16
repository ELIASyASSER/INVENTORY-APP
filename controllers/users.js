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
        console.log(error.message);
        res.status(error.statusCode||400).send(error.message||"somethign went wrong ")
    }
}

const registerUser = async(req,res)=>{
    
    res.render("register.ejs")
}

const loginUser = async(req,res)=>{
    console.log(req.session);
    res.render("login.ejs")
}

module.exports = {
    postregisterUser,
    registerUser,
    loginUser,
}