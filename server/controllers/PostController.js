import APIError from "../error/APIError.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Topic from "../models/Topic.js";

class PostController {
    async createPost(req, res, next) {
        try {
            const {title, content, topicId} = req.body
            const userId = req.user.id
            const post = await Post.create({title, content, userId, topicId})
            return res.json({post})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }

    async updatePost(req, res, next) {
        try {
            const {postId, title, content} = req.body
            const contentOption = content ? {content} : {}
            const titleOption = title ? {title} : {}
            const options = {...contentOption, ...titleOption}
            const post = await Post.findByIdAndUpdate({_id: postId}, options)
            return res.json({post})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }

    async getPosts(req, res, next) {
        try {
            const {page, limit, topicId, title} = req.query
            const offset = page * limit - limit
            const topicOption = topicId ? {topicId} : {}
            const valueOption = title ? {title: new RegExp(title, 'i')} : {}
            const options = {...topicOption, ...valueOption}
            const posts = await Post.find(options)
                .limit(limit)
                .skip(offset)
            const count = await Post.countDocuments(options)
            return res.json({posts, count})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }

    async deletePost(req, res, next) {
        try {
            const {id} = req.params
            await Post.deleteOne(id)
            return res.json({message: 'success'})
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
    async findPost(req, res, next) {
        try {
            const {id} = req.params
            const post = await Post.findById(id)
            return res.json(post)
        } catch (e) {
            next(APIError.badRequest(e.message))
        }
    }
}

export default new PostController()