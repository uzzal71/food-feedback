import express from "express";
const router = express.Router();

import { login, logout, registration } from "../controllers/authController";
import validators from "../models/request-models";
import { handleValidation } from "../middlewares";

router.post('/signin', handleValidation(validators.authValidate), login);
router.post('/signup', handleValidation(validators.userSchemaValidate), registration);
router.post('/logout', logout);

export default router;
