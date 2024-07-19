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
    }
})
module.exports = mongoose.model("Product",prosSchema);