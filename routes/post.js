import express from "express";
const router = express.Router();

import { getAllPostHandler, getAuthorAllPostHandler, getPostHandler, postHandler, putHandler, deleteHandler } from "../controllers/postController";
import validators from "../models/request-models";
import { handleValidation } from "../middlewares";
import { roleVerify, authorPostVerify } from "../middlewares/auth";

router.get('/', roleVerify("admin"), getAllPostHandler);
router.get('/author', getAuthorAllPostHandler);
router.get('/:id', getPostHandler);
router.post('/', global.upload.single('thumbnail'), handleValidation(validators.postSchemaValidate), postHandler);
router.put('/:id', global.upload.single('thumbnail'), handleValidation(validators.postSchemaValidate), authorPostVerify, putHandler);
router.delete('/:id', authorPostVerify, deleteHandler);

export default router;
