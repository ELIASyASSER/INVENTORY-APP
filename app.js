const exp =require("express")
const app = exp()
const ejs = require('ejs');
const connDB = require("./connection/conn");
const errorMiddleWare = require("./middleware/errorMiddlware");
const notfound = require("./middleware/notfound");
require("dotenv").config()
const {Product,Category} = require("./models/products")

//middlewares
app.use(exp.static("./public"))
app.use(exp.urlencoded({extended:true}))
app.set('views engine','ejs')



app.get("/", async(req,res)=>{



    try {
        const myproducts = await Product.find({}) 
        res.render("in.ejs",{myproducts})
        // console.log(myproducts);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong")
    }


})

app.get("/add/product",(req,res)=>{
    res.render("_add.ejs",{Product})
    
})

app.post("/add/product",async(req,res)=>{
    // console.log(req.body);
    const {product,status,category} = req.body
    const price = req.body.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1_')
    const amount = req.body.amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1_')
    
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

})


app.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.render('_cat.ejs', { categories });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  


app.get("/update/product/:id",async(req,res)=>{

    const myproduct= await Product.findOne({
        _id:req.params.id
    }) 
    // const updated


    res.render("_update.ejs",{myproduct})
})

app.post("/update/product/:id",async(req,res)=>{
    const {product,status} = req.body
    const price = req.body.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1_')
    const amount = req.body.amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1_')


    const thepr = await Product.findByIdAndUpdate({_id:req.params.id},{
        name:product,
        price:price,
        amount:amount,
        status:status

    })
    res.redirect("/")
})

app.get("/delete/product/:id",async(req,res)=>{
    const prod = await Product.findByIdAndDelete({
        _id:req.params.id
    })
    
    // console.log(prod);
    res.redirect("/")
})

app.get("/see/product/:id",async(req,res)=>{
    const prod = await Product.findById(req.params.id)

    res.render("_see.ejs",{prod})
})


//errors middlewares
app.use(errorMiddleWare)
app.use(notfound)



function start() {
    try {
        connDB(process.env.MONGO_URI)
        app.listen(3000,console.log('done...'))
        
    } catch (error) {
        console.log(error.message);
    }
}
start()
