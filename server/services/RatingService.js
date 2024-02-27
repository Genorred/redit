import Rating from "../models/Rating.js";
import APIError from "../error/APIError.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Topic from "../models/Topic.js";

const countRating = (ratingsArray) => {
    // let rate = 0
    // ratingsArray.forEach((rating) => {
    //     rate += rating.value
    // })
    // const quantity = ratingsArray.length
    // return rate / quantity


    let rate = ratingsArray.reduce((sum, current)=>{
        return sum + current
    }, 0)
    const quantity = ratingsArray.length
    return rate / quantity
}

class RatingService {
    async createRating(userId, postId, topicId, value) {
        const rating = await Rating.create({userId, postId, value, topicId})
        await this.countRating(userId, postId, topicId)
        return rating
    }

    async updateRating(userId, postId, topicId, value) {
        const rating = await Rating.findOneAndUpdate({userId, postId}, {value})
        await this.countRating(userId, postId, topicId)
        return rating
    }

    async removeRating(userId, postId, topicId) {
        await Rating.deleteOne({userId, postId})
        await this.countRating(userId, postId, topicId)
    }

    async countRating(userId, postId, topicId) {
        if (userId) {
            const ratings = await Rating.find({userId})
            const rating = countRating(ratings)
            await User.findByIdAndUpdate({_id: userId}, {rating})
        }
        if (postId) {
            const ratings = await Rating.find({postId})
            const rating = countRating(ratings)
            await Post.findByIdAndUpdate({_id: postId}, {rating})
        }
        if (topicId) {
            const ratings = await Rating.find({topicId})
            const rating = countRating(ratings)
            await Topic.findByIdAndUpdate({_id: topicId}, {rating})
        }
    }
}

export default new RatingService()