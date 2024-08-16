require("dotenv").config()

const exp = require("express")
const app = exp()
const ejs = require('ejs')
const helmet =require("helmet")
const cors =require("cors")
const xss = require('xss-clean')
const rateLimiter = require("express-rate-limit")

const session = require("express-session")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy

const productsRoute = require("./routes/products")
const usersRoute = require("./routes/users")

const connDB = require("./connection/conn")
const User = require("./models/users")
const errorMiddleWare = require("./middleware/errorMiddlware")
const notfound = require("./middleware/notfound")
const bcrypt = require("bcryptjs")


//middlewares
app.use(rateLimiter({
    windowMs:15*60*1000,
    max:200 //limit each ip to 100 request per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(exp.urlencoded({extended:false}))
app.set('view engine','ejs')

app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false,
        httpOnly:true,
        // maxAge:30*60*1000,
        sameSite:'lax'
    }

}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(async (username,password,done)=>{
    try {
        const user = await User.findOne({username:username})
        if(!user){
            return done(null,false,{message:"Incorrect Username"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return done(null,false,{message:"Incorrect Password"})
        }
        return done(null,user)

    } catch (error) {
        done(error)
    }
}))
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id)
        done(null,user)
    } catch (error) {
        done(error,null)
    }
})
app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/show",
      failureRedirect: "/login"
    })
);

app.use(exp.static("./public"))

app.use('',usersRoute)
app.use('',productsRoute)


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
