import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';

import models from "../models/data-models";
import { userViewModel } from "../models/view-models/user-view-model";

export const tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isTokenBlacklisted = await models.Token.exists({ token });
    if (!isTokenBlacklisted || !token) {
      throw new UnauthorizedError("Token has been blacklisted");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await models.User.findById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    req.user = new userViewModel(user);
    next();
  } catch (error) {
    next(error);
  }
};

export const roleVerify = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    throw new ForbiddenError('You do not have permission to access this resource');
  }

  next();
};
