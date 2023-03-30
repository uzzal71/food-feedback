import express from "express";
const router = express.Router();

import { login, logout, registration, verifyHandler } from "../controllers/authController";
import validators from "../models/request-models";
import { handleValidation } from "../middlewares";
import { tokenVerify } from "../middlewares/auth";

router.post('/signin', handleValidation(validators.authValidate), login);
router.post('/signup', global.upload.single('avatar'), handleValidation(validators.userSchemaValidate), registration);
router.get('/verify', verifyHandler);
router.post('/logout', tokenVerify, logout);

export default router;
