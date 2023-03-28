import express from "express";
const router = express.Router();

import { getProfile, updateProfile, deleteProfile } from "../controllers/profileController";

router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;
