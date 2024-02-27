import jwt from "jsonwebtoken";
import APIError from "../error/APIError.js";

export const checkRole = (role) => (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'user is not authorized'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        decoded.roles
        if(decoded.roles.includes(role)){
            next()
        } else {
            next(APIError.forbidden('you does not have the role'))
        }
    } catch (e) {
        res.status(401).json({message: 'user is not authorized'})
    }
}