import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";
import { NotFound } from "../utils/errors";

export const getProfileService = async (id) => {
    const User = models.User;
    let model = await User.findById(id);
    let viewModel = new userViewModel(model);
    return viewModel;
}

export const updateProfileService = async (updateData, userId) => {
    const User = models.User;
    let model = await User.findById(userId);
    if (model) {
      const result = await User.findOneAndUpdate({ _id: model._id }, updateData, { new: true });
      return result;
    }

    throw new NotFound('Profile not found by the id: ' + id);
}

export const deleteProfileService = async (userId) => {
    const User = models.User;
    let model = await User.findById(userId);
    if (model) {
        let result = await User.findOneAndUpdate({ _id: model._id }, { deleteAt: new Date() }, { new: true });
        return result;
    }

    throw new NotFound('Profile not found by the id: ' + id);
}
