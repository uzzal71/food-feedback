import { loginHandler, registerHandler } from "../services/authService";
import { successResponse } from "../utils/serializer";

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
        const result = await registerHandler(body);
        res.status(201).send(result);
    } catch (error) {
        return next(error, req, res);
    }
}

export const logout = (req, res) => {
    res.status(200).json({message: 'logout'});
}
