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
        const user = await updateProfileService(body, userId);
        res.status(200).send(successResponse(body));
    } catch (error) {
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
