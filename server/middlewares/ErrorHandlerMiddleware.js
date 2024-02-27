import APIError from "../error/APIError.js";

const ErrorHandler = (err, req, res, next) => {
    if(err instanceof APIError){
       return  res.status(err.status).json({message: err.message})
    } else {
        return res.status(500).json('unexpected error')
    }
}
export default ErrorHandler