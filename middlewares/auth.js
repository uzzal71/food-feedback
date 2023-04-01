import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';

import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";

const JWT_SECRET = 'yCekP3fh2C82A6PEnwoFZ46R8V//7naAUb/1WRHI7aZwo04PdywpWzutdc3mcf3XPG7Xe+pdjTZf+SVeHcmjy7q2J1/qg9jYOk0yqRi5KwiQUvyi2kcgvujshh4crxUM5RhJJ/2uLpNDvNrhk4P0J0r6ya7KO+GZsEtEQfq6CqvezE5O9ZBY567lYjNlpaykVBo2uBZwJynlY4oE9iX1JfAkpxoXQFZPzbWn4oVV9GMipAi0nLUVGlKTvtLmw6M85DPQMireSLwSDJtbYTa3DUzYP6zUSYGcC6j9g6XM7tGJhneO7m/EosqXhEbn7DYh1BXv5VGtm4AMHyBzPP6B7w=='

export const tokenVerify = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedError("We're sorry, but the authorization header looking for cannot be found. Please check your input and try again, or contact our support team for further assistance.");

    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      throw new UnauthorizedError("We're sorry, but the token you are looking for cannot be found. Please check your input and try again, or contact our support team for further assistance.");

    const isTokenBlacklisted = await models.Token.exists({ token });
    if (!isTokenBlacklisted || !token) throw new UnauthorizedError("Unauthorized");

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await models.User.findById(decoded.user.userId);
    if (!user) throw new UnauthorizedError('Unauthorized');

    req.user = new userViewModel(user);
    next();
  } catch (error) {
    next(error);
  }
};

export const authorPostVerify = async (req, res, next) => {
  try {
    const Post = models.Post;
    const post = await Post.findById(req.params.id).populate('author', '_id').exec();

    if (!(post && post.author._id.equals(req.user.id))) throw new UnauthorizedError('You do not have permission to access this resource');

    next();
  } catch (error) {
    next(error);
  }
}

export const roleVerify = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    throw new UnauthorizedError('You do not have permission to access this resource');
  }

  next();
};
