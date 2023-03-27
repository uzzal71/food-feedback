import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';
import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";
import { NotFound } from "../utils/errors";

export const loginHandler = async (email, password) => {
  const model = models.User;
  const user = await model.findOne({ email});

  if (!user) {
      throw new NotFound(`User record not found by the email: ${email}`);
    }

    const isPasswordMatch = await user.checkPassword(password);

    if (!isPasswordMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const userInfo = new userViewModel(user);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    userInfo.token = token;
    // token save
    console.log(await models.Token.deleteMany({ owner: userInfo._id }));
    await models.Token.create({ token, owner: user.id });

    return userInfo;
}

export const registerHandler = async (userData) => {
    const model = new models.User(userData);
    const savedUser = await model.save();
    return new userViewModel(savedUser);
}
