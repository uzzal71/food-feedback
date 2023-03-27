import express from "express";
const router = express.Router();

import { getProfile, updateProfile, deleteProfile } from "../controllers/profileController";
import { tokenVerify } from "../middlewares/auth";


router.get('/', tokenVerify, getProfile);

export default router;
