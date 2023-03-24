import mongoose from "mongoose";

// schema 
const userSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, unique: true, required: true},
    username : { type: String, unique: true, required: true},
    password : { type: String, required: true},
    username : { type: Boolean, required: true, default: false},
    createdAt : { type: Date, required: true}
});

// reference model
const User = mongoose.model("User", userSchema);

export default User;