export const errorHandler = (err, req, res, next) => {
    if(err.statusCode && err.errorType){
        return res.status(err.statusCode).json({
            message: err.message,
            error: err.errorType
        })
    };

    if(err){
        return res.status(500).json({
            message: err.message,
            error: "Generic Error"
        })
    }
}