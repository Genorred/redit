import User from "../models/User.js";
import APIError from "../error/APIError.js";
import Role from "../models/Role.js";
class RoleController {
    async createRole (req, res, next) {
        try{
            const {name} = req.body
            let role = await Role.findOne({value:name})
            if(role){
                next(APIError.badRequest('role already exists'))
            }
            role = await Role.create({value: name})
            return res.json({role: role.value})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
    async addRole (req, res, next) {
        try{
            const {roleName, userId} = req.body
            const role = await Role.findOne({value: roleName})
            if(!role){
                next(APIError.badRequest('role does not exist'))
            }
            const user = await User.findOne({_id: userId})
            if(user.roles.includes(roleName)){
                next(APIError.badRequest('user already has this role'))
            }
            user.roles = [...user.roles, role.value]
            await user.save()
            return res.json({message: 'success'})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
    async removeRole (req, res, next) {
        try{
            const {roleName, userId} = req.body
            const role = await Role.findOne({value: roleName})
            if(!role){
                next(APIError.badRequest('role does not exist'))
            }
            const user = await User.findOne({_id: userId})
            if(!user.roles.includes(roleName)){
                next(APIError.badRequest('user does not has this role'))
            }
            const roles = user.roles.filter(role=>role!==roleName)
            await User.findByIdAndUpdate({_id: userId},
                {roles: [...roles]})
            return res.json({message: 'success'})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
    async deleteRole (req, res, next) {
        try{
            const {name} = req.body
            let role = await Role.findOne({value:name})
            if(!role){
                next(APIError.badRequest('role does not exists'))
            }
            await Role.deleteOne({value: name})
            return res.json({message: 'success'})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
    async getRoles (req, res, next) {
        try{
            const roles = await Role.find()
            return res.json({roles})
        } catch (e) {
            return  next(APIError.badRequest(e.message))
        }
    }
}
export default new RoleController()