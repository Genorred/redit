import Rating from "../models/Rating.js";
import APIError from "../error/APIError.js";
import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Post from "../models/Post.js";
import RatingService from "../services/RatingService.js";
class RatingController {
    async createRating(req, res, next) {
        try{
            const {postId, topicId, value} = req.body
            const userId = req.user.id
            const rating = await RatingService.createRating(userId, postId, topicId, value)
            return res.json({rating})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async updateRating(req, res, next) {
        try{
            const {postId, topicId, value} = req.body
            const userId = req.user.id
            const rating = await RatingService.updateRating(userId, postId, topicId, value)
            return res.json({rating})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async removeRating(req, res, next) {
        try{
            const {postId, topicId} = req.body
            const userId = req.user.id
            await RatingService.removeRating(userId, postId, topicId)
            return res.json({message: 'success'})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async countRating(req, res, next) {
        try{
            const {postId, topicId} = req.query
            const userId = req.user.id
            await RatingService.countRating(userId, postId, topicId)
            return res.json({message: 'success'})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
}
export default new RatingController()