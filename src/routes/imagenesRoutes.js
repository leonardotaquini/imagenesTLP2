import express from "express";
import { createImageSchema } from "../models/Imagen.js";
import { uploadImage, getAllImages } from "../controllers/imageController.js";
import { applyImageValidation } from "../middlewares/imageMiddleware.js";
const router = express.Router();

router.post("/upload", createImageSchema, applyImageValidation , uploadImage);
router.get('/getAll', getAllImages)

export default router;