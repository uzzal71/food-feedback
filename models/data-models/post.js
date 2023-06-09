import mongoose from "mongoose";
const Schema = mongoose.Schema;

// schema
const postSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title : { type: String, required: true },
    body : { type: String, required: true },
    thumbnail : { type: String, default: null },
    location : { type: String },
    totalLike : { type: Number, default: 0 },
    comments : { type: Array, default: null },
    deletedAt: { type: Date, default: null },
    createdAt : { type: Date },
    updatedAt : { type: Date }
});

// reference model
const Post = mongoose.model("Post", postSchema);

export default Post;
