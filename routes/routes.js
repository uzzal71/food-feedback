import express from "express";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/posts', post);

export default router;