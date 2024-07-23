const mongoose = require('mongoose');

const prosSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter product name']
    },
    price:{
        type:String,
        required:[true,'please enter product price']
    },
    amount:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        default:"process"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:[true,'please provide the category']
    }

    
})

const categorySchma = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the content of category"],
        unique:true
    },
})




const Product = mongoose.model("Product",prosSchema);
const Category = mongoose.model("Category",categorySchma);
module.exports = {Product,Category} ;