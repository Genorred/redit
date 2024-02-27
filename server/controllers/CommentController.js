import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import APIError from "../error/APIError.js";

class CommentController {
    async createComment(req, res, next) {
        try{
            const {postId, content} = req.body
            const userId = req.user.id
            const comment = await Comment.create({userId, postId, content})
            return res.json({comment})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async updateComment(req, res, next) {
        try{
            const {id, content} = req.body
            const comment = await Comment.findByIdAndUpdate({_id: id}, {content})
            return res.json({comment})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async deleteComment(req, res, next) {
        try{
            const {id} = req.body
            const comment = await Comment.findByIdAndDelete({_id: id})
            return res.json({comment})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async getComments(req, res, next) {
        try{
            const {postId, userId, limit, page} = req.query
            const offset = limit * page - limit
            let comments
            if (postId && userId) {
                comments = await Comment.find({postId, userId}).limit(limit).skip(offset)
            }
            if (!postId && !userId) {
                comments = await Comment.find().limit(limit).skip(offset)
            }
            if (!postId && userId) {
                comments = await Comment.find({userId}).limit(limit).skip(offset)
            }
            if (postId && !userId) {
                comments = await Comment.find({postId}).limit(limit).skip(offset)
            }
            return res.json({comments})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
}
export default new CommentController()