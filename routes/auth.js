import express from "express";
const router = express.Router();

import { login, logout, registration } from "../controllers/authController";

router.post('/signin', login);
router.post('/signup', registration);
router.post('/logout', logout);

export default router;