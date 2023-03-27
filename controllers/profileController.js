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
        const body = req.body;
        const id = await updateUser(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
}

export const deleteProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteUserById(id);
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
}
