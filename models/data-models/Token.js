import mongoose from "mongoose";
const Schema = mongoose.Schema;

// schema 
const tokenSchema = new mongoose.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Automatically delete documents after 1 hour
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// reference model
const Token = mongoose.model("Token", tokenSchema);

export default Token;