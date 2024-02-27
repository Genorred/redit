import {model, Schema} from "mongoose";

const Post = new Schema({
    title: {type: String, required: true},
    content: {type: [{
            type: {type: String, required: true},
            content: {type: String, required: true},
            styles: {type: Schema.Types.Mixed}
        }], required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    rating: {type: Number, default: 0},
    topicId: {type: String, ref: 'Topic', required: true},
})
export default model("Post", Post)