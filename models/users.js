const mongoose = require('mongoose');
const validator= require('validator');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please Enter username"],
        unique:[true,"This username already Exists "]
    },
    email:{
        type:String,
        required:[true,'Please Provide Your Email'],
        unique:[true,"This Email already Exists  "],
        validate:{
            validator:function (value) {
                return validator.isEmail(value)
            },
            message:"please Provide Correct Email Address"
        }
    }
})

module.exports = mongoose.model("User",userSchema)