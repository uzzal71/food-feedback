import mongoose from "mongoose";
const Schema = mongoose.Schema;

// schema
const tokenSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    token: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Automatically delete documents after 1 hour
    },
});

// reference model
const Token = mongoose.model("Token", tokenSchema);

export default Token;
