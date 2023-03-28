import express from "express";
const router = express.Router();

import { getProfile, updateProfile, deleteProfile } from "../controllers/profileController";

router.get('/', getProfile);

export default router;
