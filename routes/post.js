import express from "express";
const router = express.Router();

import { getAllPostHandler, getPostHandler, postHandler, putHandler, deleteHandler } from "../controllers/postController";
import validators from "../models/request-models";
import { handleValidation } from "../middlewares";
import { roleVerify } from "../middlewares/auth";

router.get('/', roleVerify("admin"), getAllPostHandler);
router.get('/author', getAllPostHandler);
router.get('/:id', getPostHandler);
router.post('/', handleValidation(validators.postSchemaValidate), postHandler);
router.put('/:id', handleValidation(validators.postSchemaValidate), putHandler);
router.delete('/:id', deleteHandler);

export default router;
