import models from "../models/data-models";


export const loginHandler = () => {

}

export const registerHandler = async (userData) => {
    const model = new models.User(userData);
    const savedUser = await model.save();
    return savedUser._id;
}