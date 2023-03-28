import { savePost, getAllPosts, updatePost, deletePostById, getPostById } from "../services/postService";
import validators from "../models/request-models";
import { handleValidation } from "../middlewares";
import { NotFound } from '../utils/errors';

export const getAllPostHandler = async (req, res, next) => {
    try {
        const users = await getAllPosts();
        res.status(200).send(users);
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
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
}
