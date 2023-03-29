import express from "express";
const router = express.Router();

import { getProfile, updateProfile, deleteProfile } from "../controllers/profileController";

router.get('/', getProfile);
router.put('/', global.upload.single('avatar'), updateProfile);
router.delete('/', deleteProfile);

export default router;
