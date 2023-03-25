import express from "express";
const router = express.Router();

const getHandler = (req, res, next) => {
    res.status(200).send("all users");
}

router.post('/login', getHandler);
router.post('/registration', getHandler);
router.post('/logout', getHandler);

export default router;