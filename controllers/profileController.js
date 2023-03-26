import { getProfile, updateProfile, deleteProfile } from "../services/profileService";
import { NotFound } from '../utils/errors';

export const getProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
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
