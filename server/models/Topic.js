import {model, Schema} from "mongoose";

const Topic = new Schema({
    title: {type: String, required: true, unique: true},
    rating: {type: Number, default: 0}
})
export default model("Topic", Topic)