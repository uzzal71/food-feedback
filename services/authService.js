import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";


export const loginHandler = () => {

}

export const registerHandler = async (userData) => {
    const model = new models.User(userData);
    const savedUser = await model.save();
    return new userViewModel(savedUser);
}