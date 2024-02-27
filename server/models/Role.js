import {model, Schema} from "mongoose";

const Role = new Schema({
    value: {type: String, required: true, unique: true},
})
export default model("Role", Role)