import { tokenVerify } from "../middlewares/auth";

import express from "express";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', tokenVerify, profile);
router.use('/posts', tokenVerify, post);

export default router;
