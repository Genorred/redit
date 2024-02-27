import {model, Schema} from "mongoose";

const Answer = new Schema({
    commentId: {type: Schema.Types.ObjectId, required: true, ref: 'Comment'},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
})
export default model("Answer", Answer)