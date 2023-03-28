import models from "../models/data-models";
import { postViewModel } from "../models/view-models/post-view-model";
import { NotFound } from "../utils/errors";

export const getAllPosts = async (limit = 10, page = 1) => {
    const Post = models.Post;

    const offset = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find().skip(offset).limit(limit).exec();
    console.log(posts);
    let viewModels = posts.map(post => new postViewModel(post));
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    return {
        current_page: page,
        next_page: nextPage,
        previous_page: previousPage,
        total_pages: totalPages,
        posts: viewModels,
    };
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
        let result = await Post.findOneAndUpdate({ _id: model._id }, { deletedAt: new Date() }, { new: true });
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
