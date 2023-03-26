import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";
import { NotFound } from "../utils/errors";

export const getProfile = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    let viewModel = new userViewModel(model);
    return viewModel;
}

export const updateProfile = async (user) => {
    const id = user.id;
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        model.username = user.username;
        model.save();
        return model._id;
    }

    throw new NotFound('Profile not found by the id: ' + id);
}

export const deleteProfile = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    if (model) {
        let result = await User.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound('Profile not found by the id: ' + id);
}