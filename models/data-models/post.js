import mongoose from "mongoose";
const Schema = mongoose.Schema;

// schema 
const postSchema = new mongoose.Schema({
    title : { type: String, required: true },
    body : { type: String, required: true },
    file : { type: String },
    location : { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    totalLike : { type: Number, default: 0 },
    comments : { type: Array },
    createdAt : { type: Date },
    updatedAt : { type: Date }
});

// reference model
const Post = mongoose.model("Post", postSchema);

export default Post;