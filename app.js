require("dotenv").config()
const exp =require("express")
const app = exp()
const ejs = require('ejs')
const helmet =require("helmet")
const cors =require("cors")
const xss = require('xss-clean')
const rateLimiter = require("express-rate-limit")
const productsRoute = require("./routes/products")
const usersRoute = require("./routes/users")

const connDB = require("./connection/conn")
const errorMiddleWare = require("./middleware/errorMiddlware")
const notfound = require("./middleware/notfound")


//middlewares
app.use(rateLimiter({
    windowMs:15*60*1000,
    max:200 //limit each ip to 100 request per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(exp.static("./public"))
app.use(exp.urlencoded({extended:true}))
app.set('views engine','ejs')

app.use('',productsRoute)
app.use('',usersRoute)

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
