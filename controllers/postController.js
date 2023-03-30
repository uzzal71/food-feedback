import path from "path";
import fs from "fs";
import models from "../models/data-models";
import { getAllPosts, getAuthorAllPosts, getPostById, savePost, updatePost, deletePostById } from "../services/postService";
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

export const getAuthorAllPostHandler = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const posts = await getAuthorAllPosts(parseInt(limit), parseInt(page), req.user.id);
        res.status(200).send(successResponse(posts));
    } catch (error) {
        return next(error, req, res);
    }
};

export const getPostHandler = async (req, res, next) => {
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
        console.log(req);
        const body = req.body;
        if (req.file) body.thumbnail = req.file.filename
        const postId = await savePost(body, req.user.id);
        res.status(201).send(successResponse({postId}));
    } catch (error) {
        console.log(req);
        return next(error, req, res);
    }
};

export const putHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        let postData = await models.Post.findById(id);

        if (req.file && postData && req.file.filename !== '') body.thumbnail = req.file.filename;
        else body.thumbnail = postData.filename;

        const filePath = `${path.join(__dirname, '..')}/uploads/${postData.thumbnail}`;

        if (req.file && fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err)  return next(err, req, res);
                return;
            });
        }
        const post = await updatePost(body, id);
        res.status(200).send(successResponse({postId: post._id}));
    } catch (error) {
        let filePath;
        if (req.file) filePath = `${path.join(__dirname, '..')}/uploads/${req.file.filename}`;
        if (fs.existsSync(path)) {
            fs.unlink(filePath, (err) => {
                if (err)  return next(err, req, res);
                return;
            });
        }

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
