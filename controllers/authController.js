import { registerHandler } from "../services/authService";

export const login = (req, res) => {
    const { email, password } = req.body;

    res.status(200).json({data: req.body});
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