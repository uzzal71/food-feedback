import fs from 'fs';
import path from "path";

import { loginHandler, registerHandler, logoutHandler } from "../services/authService";
import models from "../models/data-models";
import { successResponse } from "../utils/serializer";
import UnauthorizedError from 'http-errors';

export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await loginHandler(email, password);
      res.status(200).send(successResponse(result));
    } catch (error) {
      return next(error, req, res);
    }
}

export const registration = async(req, res, next) => {
    try {
        const body = req.body;
        if (req.file) body.avatar = req.file.filename
        const result = await registerHandler(body);
        res.status(201).send(result);
    } catch (error) {
        const filePath = `${path.join(__dirname, '..')}/uploads/${req.file.filename}`;
        fs.unlink(filePath, (err) => {
          if (err)  return next(err, req, res);
          return;
        });

        return next(error, req, res);
    }
}
export const verifyHandler = (req, res, next) => {
  res.status(201).send({status: 200, message: 'Congratulation your account is activated!'});
  next();
};

export const logout = async(req, res, next) => {
  try {
      const model = models.User
      const user = await model.findOne({"_id": req.user.id});
      if (!user) throw new UnauthorizedError('Unauthorized');

      const result = await logoutHandler(user._id);
      res.status(200).json({status: 200, message: 'Logout Successfuly'});
  } catch (error) {
      return next(error, req, res);
  }
}
