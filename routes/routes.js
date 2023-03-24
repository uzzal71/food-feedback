import express from "express";
import userRoute from "./userRoute";
import postRoute from "./postRoute";

const router = express.Router();

router.use('/users', userRoute);
router.use('/posts', postRoute);

export default router;