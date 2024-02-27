import {model, Schema} from "mongoose";

const User = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    rating: {type: Number}
})
export default model("User", User)