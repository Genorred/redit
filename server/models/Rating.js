import {model, Schema} from "mongoose";

const Rating = new Schema({
    value: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    postId: {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
    topicId: {type: Schema.Types.ObjectId, required: true, ref: 'Topic'},
})
export default model("Rating", Rating)