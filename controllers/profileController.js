import path from "path";
import fs from "fs";
import models from "../models/data-models";
import { getProfileService, updateProfileService, deleteProfileService } from "../services/profileService";
import { NotFound } from '../utils/errors';
import { successResponse } from "../utils/serializer";

export const getProfile = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await getProfileService(id);
        if (user) {
            res.status(200).send(successResponse(user));
        }
        else {
            throw new NotFound('unauthorized');
        }
    } catch (error) {
        return next(error, req, res);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const body = req.body;
        let userData = await models.User.findById(userId);

        if (req.file && userData && req.file.filename !== 'default.png') body.avatar = req.file.filename;
        else body.avatar = userData.filename;

        const filePath = `${path.join(__dirname, '..')}/uploads/${userData.avatar}`;

        if (userData.avatar !== 'default.png' && fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err)  return next(err, req, res);
                return;
            });
        }

        const user = await updateProfileService(body, userId);
        
        res.status(200).send(successResponse(user));
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

export const deleteProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await deleteProfileService(userId);
        res.status(200).json({status: 200, message: "Your account deactivated"});
    } catch (error) {
        return next(error, req, res);
    }
}
