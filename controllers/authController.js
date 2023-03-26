import { registerHandler } from "../services/authService";
import { saveUser } from "../services/userService";

export const login = (req, res) => {
    const { email, password } = req.body;

    res.status(200).json({data: req.body});
}

export const registration = async(req, res, next) => {
    try {
        const body = req.body;
        const id = await saveUser(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
}

export const logout = (req, res) => {
    res.status(200).json({message: 'logout'});
}