const invalid_Route_Error = (req,res,next)=>{
    const error = new Error("NOT FOUND");
    error.status=404;
    next(error)
}

const invalid_Server_Error= (error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message : error.message
        }
    })
}

module.exports={invalid_Route_Error,invalid_Server_Error}