import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';

import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";

export const tokenVerify = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedError("We're sorry, but the authorization header looking for cannot be found. Please check your input and try again, or contact our support team for further assistance.");

    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      throw new UnauthorizedError("We're sorry, but the token you are looking for cannot be found. Please check your input and try again, or contact our support team for further assistance.");

    const isTokenBlacklisted = await models.Token.exists({ token });
    if (!isTokenBlacklisted || !token) throw new UnauthorizedError("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await models.User.findById(decoded.user.userId);
    if (!user) throw new UnauthorizedError('Unauthorized');

    req.user = new userViewModel(user);
    next();
  } catch (error) {
    next(error);
  }
};

export const roleVerify = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    throw new UnauthorizedError('You do not have permission to access this resource');
  }

  next();
};
