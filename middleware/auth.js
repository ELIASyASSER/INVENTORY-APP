const jwt = require('jsonwebtoken')
const auth =(req,res,next)=>{
    // If user is authenticated just continue to the route's code
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/login");
}
module.exports = auth;
