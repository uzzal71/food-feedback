import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';
import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";
import { NotFound } from "../utils/errors";
import { sendMail } from '../helpers/mail';

export const loginHandler = async (email, password) => {
  const model = models.User;
  const user = await model.findOne({ email: email, deleteAt: null });
  if (!user) throw new NotFound(`User record not found by the email: ${email}`);

  const isPasswordMatch = await user.checkPassword(password);
  if (!isPasswordMatch) throw new UnauthorizedError('Invalid email or password');

    const userInfo = new userViewModel(user);
    const token = jwt.sign({ user: {userId: user._id, name: user.name, email: user.email, createdAt: user.createdAt} }, process.env.JWT_SECRET, { expiresIn: '1h' })
    userInfo.token = token;

    // token save
    const tokenDeleted = await models.Token.deleteMany({ owner: userInfo.id });
    await models.Token.create({ token, owner: user.id });

    return userInfo;
}

export const registerHandler = async (userData) => {
    const model = new models.User(userData);
    const savedUser = await model.save();
    // sene mail
    sendMail(savedUser.email, "Registration confirmation");
    return new userViewModel(savedUser);
}

export const logoutHandler = async (userId) => {
  const model = models.Token;
  const deletedToken = await model.deleteMany({ owner: userId });
  if (!deletedToken)  throw new NotFound(`Token record not found for user with id: ${userId}`);

  return true;
}
