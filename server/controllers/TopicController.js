import Topic from "../models/Topic.js";
import APIError from "../error/APIError.js";

class TopicController {
    async createTopic(req, res, next) {
        try{
            const {title} = req.body
            const topic = await Topic.create({title})
            return res.json({topic})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async updateTopic(req, res, next) {
        try{
            const {id, title} = req.body
            const topic = await Topic.findByIdAndUpdate({_id: id}, {title})
            return res.json({topic})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async getTopics(req, res, next) {
        try{
            const {page, limit, title} = req.query
            const offset = page * limit - limit
            const valueOption = title ? {title: new RegExp(title, 'i')} : {}
            const topics = await Topic.find()
                .limit(limit)
                .skip(offset)
            const count = await Topic.countDocuments()
            return res.json({topics, count})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async deleteTopic(req, res, next) {
        try{
            const {id} = req.params
            await Topic.deleteOne({_id: id})
            return res.json({message: 'success'})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
}
export default new TopicController()