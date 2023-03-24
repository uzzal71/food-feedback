import express from "express";
const router = express.Router();

const getHandler = (req, res, next) => {
    res.status(200).send("all users");
}

router.get('/', getHandler);

export default router;