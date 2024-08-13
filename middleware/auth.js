const jwt = require('jsonwebtoken')
const auth =(req,res,next)=>{
    const auth = req.headers.authorization
    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(401).send("Unauthorized user")
    }
    const token = auth.split(" ")[1]
    try {
        const payloads = jwt.verify(token,'secret')
        req.user = {Id:payloads.userId,Email:payloads.userEmail}
        console.log(req.user);

        next()
    } catch (error) {
        res.status(401).json({msg:"authentication Fields",err:error.message})
    }
    


}
module.exports = auth;