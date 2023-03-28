import models from "../models/data-models";
import { postViewModel } from "../models/view-models/post-view-model";
import { NotFound } from "../utils/errors";

export const getAllPosts = async () => {
    const Post = models.Post;
    const posts = await Post.find();
    let viewModels = posts.map(post => new postViewModel(post));
    return viewModels;
}

export const savePost = async (post, userId) => {
    const model = new models.Post(post);
    model.owner = userId;
    console.log(model);
    const savedPost = await model.save();
    return savedPost._id;
};

export const updatePost = async (post) => {
    const id = post.id;
    const Post = models.Post;
    let model = await Post.findById(id);
    if (model) {
        model.title = post.title;
        model.body = post.body;
        model.save();
        return model._id;
    }

    throw new NotFound('Post not found by the id: ' + id);
}

export const deletePostById = async (id) => {
    const Post = models.Post;
    let model = await Post.findById(id);
    if (model) {
        let result = await Post.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('Post not found by the id: ' + id);
}

export const getPostById = async (id) => {
    const Post = models.Post;
    let model = await Post.findById(id);
    let viewModel = new postViewModel(model);
    return viewModel;
}
