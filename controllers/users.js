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

const postloginUser = async(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if(err){
            console.log(err);
            return next(err)
        } 
        if(!user){
            return res.redirect("/")
        }
        req.logIn(user,(err)=>{
            if(err) {
                console.log(err);
                
                return next(err)
            }
            return res.redirect("/show")
        })
    })(req,res,next)
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