const {cutomError,badRequest}=require("../customErrors/errorPackage")

const errorMiddleWare = (err,req,res,next)=>{
    console.error('error middleware:', err);
    if(err instanceof cutomError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:err.message})

}

module.exports = errorMiddleWare
