import { savePost, getAllPosts, updatePost, deletePostById, getPostById } from "../services/postService";
import { NotFound } from '../utils/errors';
import { successResponse } from "../utils/serializer";

export const getAllPostHandler = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const posts = await getAllPosts(parseInt(limit), parseInt(page));
        res.status(200).send(successResponse(posts));
    } catch (error) {
        return next(error, req, res);
    }
};

export const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getPostById(id);
        if (user) {
            res.status(200).send(user);
        }
        else {
            throw new NotFound('User not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

export const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await savePost(body, req.user.id);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

export const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await updatePost(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
}

export const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deletePostById(id);
        res.status(200).json({ status: 200, message: "Post deleted successfully" });
    } catch (error) {
        return next(error, req, res);
    }
}
