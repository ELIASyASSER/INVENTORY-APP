const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    },
    password:{
        type:String,
        required:[true,'Please Provide Your Password'],
        
    },
    confirmPassword:{
        type:String,
        required:[true,'Please Enter The Confirm Password '],
        validate:{
            validator: function (val) {
                return val === this.password
            },
            message:"Password Doesnt Match"

        }
    }

})
userSchema.pre("save",async function(next){

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    this.confirmPassword = undefined
    next()
})

module.exports = mongoose.model("User",userSchema)