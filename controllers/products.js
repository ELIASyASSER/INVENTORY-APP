const {Product,Category} = require("../models/products")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//show all products
const showProducts = async(req,res)=>{
    try {
        
        const myproducts = await Product.find({}).populate("category")
        const cats = await Category.find({}) 
        res.render("in.ejs",{myproducts,cats})
        // console.log(myproducts);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong")
    }
    
    
}

//adding products 
const addProduct = async(req,res)=>{
    // console.log(req.body);
    const {product,status,category} = req.body
    const price = req.body.price
    const amount = req.body.amount
    
    // console.log(product,status,price,amount);
    try {
        await Product.create({
            name:product,
            price:price,
            amount:amount,
            status:status,
            category:category,
            
            

        })
      

        res.redirect("/")

    
    } catch (error) {
        res.json({msg:"please enter valid data",err:error.message})

    }

}
const showAddProduct = async(req,res)=>{
    let Cat = await Category.find({})
    res.render("_add.ejs",{Product,Cat})
    
}

//updating products
const updateProduct = async(req,res)=>{
    const {product,status,category} = req.body
    const price = req.body.price
    const amount = req.body.amount


    const thepr = await Product.findByIdAndUpdate({_id:req.params.id},{
        name:product,
        price:price,
        amount:amount,
        status:status,
        category:category

    })
    res.redirect("/")
}
const showUpdateProduct = async(req,res)=>{
    try {
        let Cat = await Category.find({})
        const myproduct= await Product.findOne({
            _id:req.params.id
        }).populate("category")
        // const updated
    
    
        res.render("_update.ejs",{myproduct,Cat})     
    } catch (error) {
        console.log(error.message);
    }
   
}
//deleting products
const deleteProduct =  async(req,res)=>{
    const prod = await Product.findByIdAndDelete({
        _id:req.params.id
    })
    
    // console.log(prod);
    res.redirect("/")
}
//show product details
const productDetails = async(req,res)=>{
    const prod = await Product.findById(req.params.id).populate("category")

    res.render("_see.ejs",{prod})
}

module.exports = {
    showProducts
    ,addProduct
    ,showAddProduct
    ,showUpdateProduct
    ,updateProduct
    ,deleteProduct
    ,productDetails
}