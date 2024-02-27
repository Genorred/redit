import {model, Schema} from "mongoose";

const Comment = new Schema({
    content: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    likes: {type: Number, default: 0},
    disLikes: {type: Number, default: 0}
})
export default model("Comment", Comment)