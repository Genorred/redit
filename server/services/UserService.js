import User from "../models/User.js";
import APIError from "../error/APIError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
const createToken = (id, name, roles, rating) => {
    const payload = {
        id,
        name,
        roles,
        rating
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}
class UserService {
    async registration (name, password) {
            const candidate = await User.findOne({name})
            if(candidate){
                return  APIError.badRequest('user already exists')
            }
            const hashedPassword = await bcrypt.hash(password, 6)
            const role = await Role.findOne({value: 'USER'})
            const user = await User.create({name, password: hashedPassword, roles: [role.value]})
            const token = createToken(user.id, name, user.roles, user.rating)
            return token
    }
    async login (name, password) {
            const candidate = await User.findOne({name})
            if(!candidate){
                return APIError.badRequest('user was not found')
            }
            const hashedPassword = candidate.password
            const passwordValid = bcrypt.compareSync(password, hashedPassword)
            if(!passwordValid){
                return APIError.badRequest('password is not valid')
            }
            const token = createToken(candidate.id, name, candidate.roles, candidate.rating)
            return {token, roles: candidate.roles, id: candidate.id, rating: candidate.rating}
    }
    async check (id, name, roles, rating) {
            const token = createToken(id, name, roles, rating)
            return token
    }
    async delete (id) {
            await User.deleteOne({_id: id})
            return {message: 'success'}
    }
}
export default new UserService()