module.exports = notFoundMiddleware = (req,res)=>{
    res.status(404).send("router does not exist")

}

