import User from "../models/User.js";
import APIError from "../error/APIError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import UserService from "../services/UserService.js";
const createToken = (id, name, roles, rating) => {
    const payload = {
        id,
        name,
        roles,
        rating
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}
class UserController {
    async registration (req, res, next) {
        try{
            const {name, password} = req.body
            const candidate = await User.findOne({name})
            if(candidate){
               return  next(APIError.badRequest('user already exists'))
            }
            const hashedPassword = await bcrypt.hash(password, 6)
            const role = await Role.findOne({value: 'ADMIN'})
            const user = await User.create({name, password: hashedPassword, roles: [role.value]})
            const token = createToken(user.id, name, user.roles, user.rating)
            // const token = await UserService.registration(name, password)
            return res.json({token})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
    async login (req, res, next) {
        try{
            const {name, password} = req.body
            const candidate = await User.findOne({name})
            if(!candidate){
                return  next(APIError.badRequest('user was not found'))
            }
            const hashedPassword = candidate.password
            const passwordValid = bcrypt.compareSync(password, hashedPassword)
            if(!passwordValid){
                return  next(APIError.badRequest('password is not valid'))
            }
            const token = createToken(candidate.id, name, candidate.roles, candidate.rating)
            return res.json({token})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
    async check (req, res, next) {
        try{
            const {id, name, roles, rating} = req.user
            const token = createToken(id, name, roles, rating)
            return res.json({token})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }



    async delete (req, res, next) {
        try{
            const {id} = req.user
            await User.deleteOne({_id: id})
            return res.json({message: 'success'})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
}
export default new UserController()