import mongoose from "mongoose";

// schema 
const userSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, unique: true, required: true},
    username : { type: String, unique: true, required: true},
    password : { type: String, required: true},
    isVerify : { type: Boolean, required: true, default: false},
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    avater: { type: String, default: 'profile/default.png' },
    createdAt : { type: Date },
    updatedAt : { type: Date }
});

// reference model
const User = mongoose.model("User", userSchema);

export default User;