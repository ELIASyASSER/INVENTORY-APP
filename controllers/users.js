const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const postregisterUser = async(req,res)=>{

    const {username,password,confirmPassword,email} = req.body
    try {
        
        const user = await User.create({username,email,password,confirmPassword})
        if(password !== confirmPassword){
            res.status(400).send("password must be the same ")
        }
        if(password.length <4 ||confirmPassword.length<4){
            res.status(400).send("password must be more than 4 characters ")
        }
        const token = user.createJwt()

        res.json({token:token})
                
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const registerUser = async(req,res)=>{
    res.render("register.ejs")
}

const postloginUser = async(req,res)=>{
    
}

const loginUser = async(req,res)=>{
    res.render("login.ejs")
}


module.exports = {
    postregisterUser,
    registerUser,
    postloginUser,
    loginUser,

}