import express from "express";
import { uploadImage, deleteImage, getAllImages } from "../controllers/imageController.js";
const router = express.Router();

router.post("/upload", uploadImage);
router.get('/getAll', getAllImages)

export default router;