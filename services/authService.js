import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';
import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";
import { NotFound } from "../utils/errors";
import { sendMail } from '../helpers/mail';
import { sendMailQueue } from '../helpers/mailQueueMongodb';
import { registerTemplate } from '../helpers/template/registration';

const JWT_SECRET = 'yCekP3fh2C82A6PEnwoFZ46R8V//7naAUb/1WRHI7aZwo04PdywpWzutdc3mcf3XPG7Xe+pdjTZf+SVeHcmjy7q2J1/qg9jYOk0yqRi5KwiQUvyi2kcgvujshh4crxUM5RhJJ/2uLpNDvNrhk4P0J0r6ya7KO+GZsEtEQfq6CqvezE5O9ZBY567lYjNlpaykVBo2uBZwJynlY4oE9iX1JfAkpxoXQFZPzbWn4oVV9GMipAi0nLUVGlKTvtLmw6M85DPQMireSLwSDJtbYTa3DUzYP6zUSYGcC6j9g6XM7tGJhneO7m/EosqXhEbn7DYh1BXv5VGtm4AMHyBzPP6B7w=='
const APP_PORT = 3000;
const APP_URL = "http://localhost"

export const loginHandler = async (email, password) => {
  const model = models.User;
  const user = await model.findOne({ email: email, deleteAt: null });
  if (!user) throw new NotFound(`User record not found by the email: ${email}`);

  const isPasswordMatch = await user.checkPassword(password);
  if (!isPasswordMatch) throw new UnauthorizedError('Invalid email or password');

    const userInfo = new userViewModel(user);
    const token = jwt.sign({ user: {userId: user._id, name: user.name, email: user.email, createdAt: user.createdAt} }, JWT_SECRET, { expiresIn: '1h' })
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
    //sendMail(savedUser.email, "Registration confirmation", {name: userData.name, link: `${process.env.APP_URL}:${process.env.APP_PORT}/api/v1/auth/verify`});
    sendMailQueue(savedUser.email, "Registration confirmation", {name: userData.name, link: `${process.env.APP_URL}:${process.env.APP_PORT}/api/v1/auth/verify`});;
    return new userViewModel(savedUser);
}

export const logoutHandler = async (userId) => {
  const model = models.Token;
  const deletedToken = await model.deleteMany({ owner: userId });
  if (!deletedToken)  throw new NotFound(`Token record not found for user with id: ${userId}`);

  return true;
}
