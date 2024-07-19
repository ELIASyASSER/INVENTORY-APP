const {cutomError,badRequest}=require("../customErrors/errorPackage")

const errorMiddleWare = (err,req,res,next)=>{
    if(err instanceof cutomError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:err.message})

}

module.exports = errorMiddleWare
