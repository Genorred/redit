import APIError from "../error/APIError.js";
import Answer from "../models/Answer.js";

class AnswerController {
    async createAnswer(req, res, next) {
        try{
            const {commentId, content} = req.body
            const userId = req.user.id
            const answer = await Answer.create({userId, commentId, content})
            return res.json({answer})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async updateAnswer(req, res, next) {
        try{
            const {id, content} = req.body
            const answer = await Answer.findByIdAndUpdate({_id: id}, {content})
            return res.json({answer})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async deleteAnswer(req, res, next) {
        try{
            const {id} = req.body
            const answer = await Answer.findByIdAndDelete({_id: id})
            return res.json({answer})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async getAnswers(req, res, next) {
        try{
            const {commentId, userId, limit, page} = req.query
            const offset = limit * page - limit
            let answers
            if (commentId && userId) {
                answers = await Answer.find({commentId, userId}).limit(limit).skip(offset)
            }
            if (!commentId && !userId) {
                answers = await Answer.find().limit(limit).skip(offset)
            }
            if (!commentId && userId) {
                answers = await Answer.find({userId}).limit(limit).skip(offset)
            }
            if (commentId && !userId) {
                answers = await Answer.find({commentId}).limit(limit).skip(offset)
            }
            return res.json({answers})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
}
export default new AnswerController()